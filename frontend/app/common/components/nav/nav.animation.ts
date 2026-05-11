// nav.animation.ts
"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useNavScrollShrink(headerRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const header = headerRef.current;
    const main = document.querySelector("main");
    const logo = document.querySelector(".logo img");

    if (!header || !main || !logo) return;

    ScrollTrigger.matchMedia({
      // Solo Desktop >= 1024px
      "(min-width: 1025px)": () => {
        gsap.to(header, {
          paddingTop: 0,
          paddingBottom: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: main,
            start: "top+=200 top+=100",
            end: "top+=200 top+=100",
            scrub: true,
          },
        });

        gsap.to(logo, {
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: main,
            start: "top+=200 top+=100",
            end: "top+=200 top+=100",
            scrub: true,
          },
        });
      },

      "(max-width: 1024px)": () => {
        gsap.set(headerRef.current, { paddingTop: "", paddingBottom: "" });
        gsap.set(".logo img", { height: "" });
      },
    });
  }, [headerRef]);
}


export function useNavHideOnScroll(
  headerRef: RefObject<HTMLElement | null>,
  isMenuOpen: boolean
) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 1025px)");

    // Si no es desktop, asegúrate de que esté visible y no montes listeners
    if (!mq.matches) {
      headerRef.current?.classList.remove("nav-hidden");
      return;
    }

    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const header = headerRef.current;
        const y = window.scrollY;
        const delta = y - lastY;

        if (header && isMenuOpen) {
          header.classList.remove("nav-hidden");
          lastY = y;
          ticking = false;
          return;
        }

        if (header) {
          const threshold = 8;
          const minScroll = 80;

          if (y > minScroll && delta > threshold) {
            header.classList.add("nav-hidden");
          } else if (delta < -threshold) {
            header.classList.remove("nav-hidden");
          }

          if (y < 10) header.classList.remove("nav-hidden");
        }

        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Si cambia el tamaño de pantalla (desktop <-> mobile), re-evalúa
    const onMqChange = () => {
      if (!mq.matches) {
        headerRef.current?.classList.remove("nav-hidden");
        window.removeEventListener("scroll", onScroll);
      }
    };

    mq.addEventListener("change", onMqChange);

    return () => {
      mq.removeEventListener("change", onMqChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, [headerRef, isMenuOpen]);
}