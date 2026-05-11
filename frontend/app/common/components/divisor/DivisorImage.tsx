"use client";

import React from "react";
import ResponsiveImage from "@/app/common/components/img/ResponsiveImage";
import { useGsapCore } from "@/app/common/lib/gsap/gsapClient";
import { IMG } from "@/app/_domain/sanity/types";

type Props = {
  imageData: IMG;

  id?: string;
  sectionClassName?: string;
  columnClassName?: string;
  imgClassName?: string;

  height?: number;
  variant?: "hero" | "banner" | "card" | "gallery" | "thumbnail" | "icon";

  fromScale?: number;
  toScale?: number;
  start?: string;
  end?: string;

  desktopMQ?: string;
};

export default function DivisorImage({
  imageData,
  id,
  sectionClassName = "divisor",
  columnClassName = "column__1",
  imgClassName = "divisor__img",
  height,
  variant = "hero",
  fromScale = 1.2,
  toScale = 1,
  start = "top bottom",
  end = "bottom bottom",
  desktopMQ = "(min-width: 1024px)",
}: Props) {
  const { gsap, ScrollTrigger } = useGsapCore();

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const imgInnerRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const section = sectionRef.current;
    const inner = imgInnerRef.current;
    if (!section || !inner) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop:
      mm.add("(min-width: 1024px)", () => {
        gsap.set(inner, { scale: fromScale, transformOrigin: "center center", filter: "brightness(0.5)" });

        const tween = gsap.to(inner, {
          scale: toScale,
          filter: "brightness(1)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start,
            end,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          tween.scrollTrigger?.kill(true);
          tween.kill();
          gsap.set(inner, { clearProps: "transform,filter,willChange" });
        };
      });

      // Mobile:
      mm.add("(max-width: 1023px)", () => {
        const mobileFrom = 1.08;
        const mobileTo = 1;

        gsap.set(inner, { scale: mobileFrom, transformOrigin: "center center", filter: "brightness(0.75)" });

        const tween = gsap.to(inner, {
          scale: mobileTo,
          filter: "brightness(1)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 30%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          tween.scrollTrigger?.kill(true);
          tween.kill();
          gsap.set(inner, { clearProps: "transform,filter,willChange" });
        };
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, [gsap, ScrollTrigger, fromScale, toScale, start, end, desktopMQ]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section__divisor ${sectionClassName}`.trim()}
    >
      <div className={columnClassName}>
        <div
          style={{
            overflow: "hidden",
            width: "100%",
            ...(height ? { height } : {}),
          }}
        >
          <div ref={imgInnerRef}>
            <ResponsiveImage
              imageData={imageData}
              variant={variant}
              className={imgClassName}
            />
          </div>
        </div>
      </div>
    </section>
  );
}