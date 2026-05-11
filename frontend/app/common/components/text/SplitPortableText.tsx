"use client";

import "./SplitText.scss";
import React from "react";
import CustomPortableText from "@/app/common/components/text/CustomPortableText";
import { useGsapCore } from "@/app/common/lib/gsap/gsapClient";
import { Block } from "@/app/_domain/sanity/types";

type Props = {
  data: Block[]; // portable text
  className?: string; // clase del section o wrapper externo
  id?: string;
  /** selector dentro del portableText que quieres animar */
  targetSelector?: string; // default: "h2, p"

  /** opcional: si tu portableText trae imágenes, puedes controlarlo */
  hasImg?: boolean;

  /** scroll settings */
  start?: string; // default "top 90%"
  end?: string; // default "top 65%"
};

export default function SplitPortableText({
  data,
  id,
  className = "",
  targetSelector = "h2, p",
  hasImg = false,
  start = "top 90%",
  end = "top 65%",
}: Props) {
  const { gsap, SplitText, ScrollTrigger } = useGsapCore();

  const rootRef = React.useRef<HTMLElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    if (!root || !content) return;

    if (!gsap || !SplitText || !ScrollTrigger) return;

    let splits: any[] = [];
    let resizeTimer: number | null = null;

    const killLocalTriggers = () => {
      ScrollTrigger.getAll().forEach((st) => {
        const triggerEl = st.trigger as Element | null;
        if (triggerEl && root.contains(triggerEl)) st.kill(true);
      });
    };

    const cleanup = () => {
      // revert split (también revierte wrappers generados por SplitText)
      splits.forEach((s) => {
        try {
          s?.revert?.();
        } catch {}
      });
      splits = [];

      // remover wrappers que hicimos manualmente
      content.querySelectorAll(".st-line-wrap").forEach((wrap) => {
        const parent = wrap.parentNode;
        if (!parent) return;

        // mueve los hijos de vuelta al parent y elimina wrapper
        while (wrap.firstChild) parent.insertBefore(wrap.firstChild, wrap);
        parent.removeChild(wrap);
      });

      killLocalTriggers();
    };

    const wrapLine = (line: HTMLElement) => {
      // evita duplicar wrap en rebuild
      if (line.parentElement?.classList.contains("st-line-wrap")) return;

      const wrap = document.createElement("div");
      wrap.className = "st-line-wrap";
      wrap.style.overflow = "hidden";
      wrap.style.display = "block";

      // inserta wrap justo antes de la línea y mete la línea dentro
      line.parentNode?.insertBefore(wrap, line);
      wrap.appendChild(line);

      // recomendado
      line.style.display = "block";
      line.style.willChange = "transform";
    };

    const build = () => {
      cleanup();

      const targets = Array.from(content.querySelectorAll<HTMLElement>(targetSelector));
      if (!targets.length) return;

      targets.forEach((target) => {
        // SplitText (constructor recomendado para control)
        const split = new SplitText(target, {
          type: "lines",
          linesClass: "st-line",
        });

        // wrappers por línea para máscara real
        split.lines.forEach((line) => wrapLine(line as HTMLElement));

        // estado inicial
        gsap.set(split.lines, { yPercent: 110, autoAlpha: 1 });

        // animación: 1 trigger por línea
        split.lines.forEach((line) => {
          gsap.to(line as HTMLElement, {
            yPercent: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line as HTMLElement,
              start,
              end,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });

        splits.push(split);
      });

      ScrollTrigger.refresh();
    };

    const ctx = gsap.context(() => {
      // por si fuentes o imágenes alteran layout al cargar
      const refreshSoon = () => {
        requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
      };

      build();

      const onResize = () => {
        if (resizeTimer) window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          build();
        }, 150);
      };

      window.addEventListener("resize", onResize);

      // imágenes dentro del portable text (si llegaran a existir)
      const imgs = Array.from(content.querySelectorAll("img")) as HTMLImageElement[];
      const onImgLoad = () => refreshSoon();
      imgs.forEach((img) => {
        img.addEventListener("load", onImgLoad);
        img.addEventListener("error", onImgLoad);
      });

      // fonts
      // @ts-ignore
      document.fonts?.ready?.then?.(() => refreshSoon());

      return () => {
        window.removeEventListener("resize", onResize);
        if (resizeTimer) window.clearTimeout(resizeTimer);

        imgs.forEach((img) => {
          img.removeEventListener("load", onImgLoad);
          img.removeEventListener("error", onImgLoad);
        });

        cleanup();
      };
    }, root);

    return () => ctx.revert();
  }, [gsap, SplitText, ScrollTrigger, targetSelector, start, end]);

  return (
    <section id={id} ref={rootRef} className={`section__split ${className}`}>
      <div className="column__1 splitPortableText" ref={contentRef}>
        <CustomPortableText hasImg={hasImg} data={data} />
      </div>
    </section>
  );
}