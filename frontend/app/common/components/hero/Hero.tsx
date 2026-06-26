"use client";

import "./hero.scss";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import ResponsiveImage from "@/app/common/components/img/ResponsiveImage";
import CustomPortableText from "@/app/common/components/text/CustomPortableText";
import Button from "@/app/common/components/btn/Button";
import { startHero } from "@/app/common/lib/gsap/hero.animations";
import type { IMG, Block } from "@/app/_domain/sanity/types";

// ─── Types ────────────────────────────────────────────────────────────────────

type PrimaryData = {
  h1?: string | null;
  portableText?: Block[] | null;
  p?: string | null;
  imgMain: IMG;
  imgSecondary?: IMG | null;
  sectionId?: string;
};

type HeroProps = {
  variant: "primary";
  data: PrimaryData;
  bg?: "gray" | "gray-light";
  scrollTo?: string;
  sectionClassName?: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

const Hero = ({ variant, data, bg = "gray", scrollTo, sectionClassName = "" }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      startHero({
        h1El: "h1",
        h2El: ".portableText h2, .portableText h3",
        pEl: ".portableText p",
        btnEl: ".btn__wrapper",
        imgEl: ".col__right",
      });
    },
    { dependencies: [variant], scope: sectionRef }
  );

  switch (variant) {

    // ── PRIMARY ──────────────────────────────────────────────────────────────
    case "primary":
      return (
        <section
          id={data.sectionId}
          ref={sectionRef}
          className={`section__hero section__hero--primary section__hero--bg-${bg} ${sectionClassName}`.trim()}
          data-anim-hero
        >
          <div className="column__2">

            <div className="col__left">
              {data.h1 && <h1>{data.h1}</h1>}

              {data.portableText && data.portableText.length > 0 && (
                <CustomPortableText hasImg={false} data={data.portableText} />
              )}

              {data.p && <p>{data.p}</p>}

              {scrollTo && (
                <div className="btn__wrapper">
                  <Button variant="scroll" to={scrollTo}>
                    Más información
                  </Button>
                </div>
              )}
            </div>

            <div className="col__right">
              <div className="wrapper__shape__hero">
                <div className="shape__hero">
                  <ResponsiveImage imageData={data.imgMain} variant="hero" priority />
                </div>
                <div className="overlay__shape__hero" aria-hidden>
                  <ResponsiveImage imageData={data.imgMain} variant="hero" />
                </div>
              </div>

              {data.imgSecondary && (
                <div className="secondary__img">
                  <ResponsiveImage imageData={data.imgSecondary} variant="hero" />
                </div>
              )}
            </div>

          </div>
        </section>
      );
  }
};

export default Hero;
