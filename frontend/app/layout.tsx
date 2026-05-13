import { Inter } from "next/font/google";
import "./styles/globals.scss";
import LenisProvider from "./common/lib/lenis/LenisProvider";
import Nav from "./common/components/nav/Nav";
import WAButton from "./common/components/btn/WAButton";
import { AnalyticsProvider } from "./common/utils/AnalyticsProvider";
//import { CookieBanner } from "./common/components/banner/CookieBanner";
import Footer from "./common/components/footer/Footer";
import GsapGlobalEffects from "./common/lib/gsap/GsapGlobalEffects";
import { getCompany, getMarketing, getProductCategories } from "./_domain/sanity";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const companyData = await getCompany()
  const productsCategories = await getProductCategories()
  const metaData = await getMarketing()

  const analyticsConfig = {
    pixelId: metaData?.meta?.string_meta_pixelId || "",
    testEventCode: metaData?.meta?.string_meta_testEventCode || "",
    enableCapi: metaData?.meta?.bool_meta_enableCapi || false,

    gtmId: metaData?.google?.string_google_gtmId || "",
  };

  return (
    <html lang="es">
      <body suppressHydrationWarning className={`${inter.variable} antialiased`}>
        {analyticsConfig.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${analyticsConfig.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <LenisProvider>
          <AnalyticsProvider config={analyticsConfig}>
            <Nav companyData={companyData} />
            <GsapGlobalEffects />
            {children}
            <Footer />
            <WAButton data={companyData} />
            {/* <CookieBanner /> */}
          </AnalyticsProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
