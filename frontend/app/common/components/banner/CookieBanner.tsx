"use client";
import "./banner.scss";
import React, { useState, useEffect } from "react";

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

const setConsentCookie = (consent: Consent) => {
  setCookie("cookie_consent", encodeURIComponent(JSON.stringify(consent)), 180);
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

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setShowBanner(!getConsentCookie()); // si no hay cookie, muestra banner
  }, []);

  const notifyConsentChange = () => {
    window.dispatchEvent(new Event("cookie-consent-changed"));
  };

  const acceptCookies = () => {
    setConsentCookie({ analytics: true, marketing: true });
    setShowBanner(false);
    notifyConsentChange();
  };

  const declineCookies = () => {
    setConsentCookie({ analytics: false, marketing: false });
    setShowBanner(false);
    notifyConsentChange();
  };

  if (!showBanner) return null;

  return (
    <div className="banner-container" role="dialog" aria-live="polite" aria-label="Aviso de cookies">
      <h2>Valoramos tu privacidad</h2>
      <p>
        Usamos cookies para mejorar tu experiencia. Puedes aceptar o rechazar las cookies no esenciales.
      </p>
      <div className="btn__wrapper">
        <button className="btn btn-accept" onClick={acceptCookies}>Aceptar</button>
        <button className="btn btn-decline" onClick={declineCookies}>Rechazar</button>
      </div>
    </div>
  );
};