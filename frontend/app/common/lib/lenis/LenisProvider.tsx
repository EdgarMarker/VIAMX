"use client";

import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { usePathname } from "next/navigation";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type LenisProviderProps = { children: ReactNode };

const LenisContext = createContext<Lenis | null>(null);
export function useLenis() {
  return useContext(LenisContext);
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const pathname = usePathname();

  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // ✅ guardamos la función para poder removerla bien
  const tickerFnRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const startLenis = () => {
      if (lenisRef.current) return;

      const instance = new Lenis({
        lerp: 0.1,
        duration: 1.2,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        smoothWheel: true,
        autoRaf: false, // sync con GSAP ticker
        anchors: true,
      });

      instance.on("scroll", ScrollTrigger.update);

      const tickerFn = (time: number) => {
        // GSAP ticker da seconds → Lenis espera ms
        instance.raf(time * 1000);
      };

      tickerFnRef.current = tickerFn;
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      lenisRef.current = instance;
      setLenis(instance);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const stopLenis = () => {
      const inst = lenisRef.current;
      if (!inst) return;

      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current);
        tickerFnRef.current = null;
      }

      inst.destroy();
      lenisRef.current = null;
      setLenis(null);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) startLenis();
      else stopLenis();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      stopLenis();
    };
  }, []);

  // ✅ Scroll al top en cada navegación
  useEffect(() => {
    // espera a que React pinte la nueva ruta
    requestAnimationFrame(() => {
      // si Lenis existe, úsalo
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }

      // fallback por si Lenis aún no está montado o estás en móvil
      window.scrollTo(0, 0);

      // opcional: recalcular triggers si hay pin/ScrollTrigger en la nueva ruta
      ScrollTrigger.refresh();
    });
  }, [pathname]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}