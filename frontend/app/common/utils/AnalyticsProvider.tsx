"use client";

import React, { createContext, useContext, useEffect, useCallback, useMemo, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

type Consent = { analytics: boolean; marketing: boolean };

const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};

const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
};

const getConsentCookie = (): Consent | null => {
  const raw = getCookie("cookie_consent");
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
};

declare global {
  interface Window {
    fbq: any;
    dataLayer: any[];
  }
}

const AnalyticsContext = createContext<{ track: (eventName: string) => Promise<void> } | null>(null);

export const AnalyticsProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: {
    pixelId?: string;
    gtmId?: string;
    testEventCode?: string;
    enableCapi?: boolean;
  };
}) => {
  const pathname = usePathname();

  const [consent, setConsent] = useState<Consent | null>(null);

  // Lee consentimiento al montar, y escucha cambios (si el usuario acepta/rechaza en esa misma sesión)
  useEffect(() => {
    const read = () => setConsent(getConsentCookie());

    read();

    window.addEventListener("cookie-consent-changed", read);
    return () => window.removeEventListener("cookie-consent-changed", read);
  }, []);

  const allowAnalytics = consent?.analytics === true;
  const allowMarketing = consent?.marketing === true;

  const track = useCallback(
    async (eventName: string) => {
      // Si no hay consentimiento todavía, no trackees nada
      if (!consent) return;

      const eventId = crypto.randomUUID();

      // --- META (marketing) ---
      if (allowMarketing && config?.pixelId) {
        const externalId = getCookie("user_external_id") || "";
        const fbc = getCookie("_fbc") || "";
        const fbp = getCookie("_fbp") || "";

        if (window.fbq) {
          window.fbq("track", eventName, {}, { eventID: eventId, external_id: externalId });
        }

        if (config?.enableCapi) {
          fetch("/api/meta", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              eventName,
              eventId,
              pixelId: config.pixelId,
              testCode: config.testEventCode,
              url: window.location.href,
              externalId,
              fbc,
              fbp,
            }),
          }).catch(() => null);
        }
      }

      // --- GOOGLE (analytics) ---
      if (allowAnalytics && config?.gtmId && window.dataLayer) {
        window.dataLayer.push({
          event: eventName,
          metaEventId: eventId,
        });
      }
    },
    [config, consent, allowAnalytics, allowMarketing]
  );

  // Solo setear cookies tipo _fbc / external_id si marketing está permitido
  useEffect(() => {
  if (!consent) return;

  if (allowMarketing) {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get("fbclid");

    if (fbclid) {
      setCookie("_fbc", `fb.1.${Date.now()}.${fbclid}`, 7);
    }

    if (!getCookie("user_external_id")) {
      setCookie("user_external_id", crypto.randomUUID(), 7);
    }
  }

  track("PageView");
}, [pathname, track, consent, allowMarketing]);

  return (
    <AnalyticsContext.Provider value={{ track }}>
      {/* Solo cargar scripts si hay consentimiento */}
      {allowMarketing && config?.pixelId && (
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${config.pixelId}');`,
          }}
        />
      )}

      {allowAnalytics && config?.gtmId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${config.gtmId}');`,
          }}
        />
      )}

      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) throw new Error("useAnalytics debe usarse dentro de AnalyticsProvider");
  return context;
};