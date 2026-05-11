"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
// si luego quieres: ScrollToPlugin, MotionPathPlugin, etc.

let isRegistered = false;

export function useGsapCore() {
  if (typeof window === "undefined") return { gsap, ScrollTrigger, useGSAP, SplitText };

  if (!isRegistered) {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    isRegistered = true;
  }

  return { gsap, ScrollTrigger, useGSAP, SplitText };
}