import "./PrevNext.scss";
import React from "react";
import Link from "next/link";
import ResponsiveImage from "@/app/common/components/img/ResponsiveImage";
import Svg from "@/app/common/components/img/Svg";
import type { IMG, SLUG } from "@/app/_domain/sanity/types";

type Getters<T> = {
  getSlug: (item: T) => string;
  getTitle: (item: T) => string;
  getImage: (item: T) => IMG;
  getCategoryName?: (item: T) => string | null | undefined;
};

type Props<T> = {
  prevItem?: T | null;
  nextItem?: T | null;

  /** Ej: "/productos" o "/productos2" */
  basePath: string;

  /** Texto de UI */
  prevLabel?: string; // "Anterior producto"
  nextLabel?: string; // "Siguiente producto"

  /** Opcional */
  sectionClassName?: string; // default "section__prev__next"
  wrapperClassName?: string; // default "column__2l fadeCards"
  cardClassName?: string;    // default "card"
  linkClassNamePrev?: string; // default "btn__prev__next btn__prev"
  linkClassNameNext?: string; // default "btn__prev__next btn__next"

  /** Cómo leer el item (para soportar products, services, posts, etc.) */
  getters: Getters<T>;
};

export default function PrevNextSection<T>({
  prevItem,
  nextItem,
  basePath,
  prevLabel = "Anterior",
  nextLabel = "Siguiente",
  sectionClassName = "section__prev__next",
  wrapperClassName = "column__2 fadeCards",
  cardClassName = "card",
  linkClassNamePrev = "btn__prev__next btn__prev",
  linkClassNameNext = "btn__prev__next btn__next",
  getters,
}: Props<T>) {
  // Si no hay nada, no renderiza (para evitar secciones vacías)
  if (!prevItem && !nextItem) return null;

  const renderCard = (item: T, side: "prev" | "next") => {
    const href = `${basePath}/${getters.getSlug(item)}`;
    const title = getters.getTitle(item);
    const img = getters.getImage(item);
    const categoryName = getters.getCategoryName?.(item);

    return (
      <Link
        className={side === "prev" ? linkClassNamePrev : linkClassNameNext}
        href={href}
      >
        <div className="prevnext__img">
          <ResponsiveImage imageData={img} variant="card" />
        </div>

        <div className="prevnext__data">
          {side === "prev" ? (
            <span>
              <Svg variant="Arrow" />
              {prevLabel}
            </span>
          ) : (
            <span>
              {nextLabel} <Svg variant="Arrow" />
            </span>
          )}

          <h2>{title}</h2>
          {categoryName ? <h3>{categoryName}</h3> : null}
        </div>
      </Link>
    );
  };

  return (
    <section className={sectionClassName}>
      <div className={wrapperClassName}>
        <div className={`col__left ${cardClassName}`.trim()}>
          {prevItem ? renderCard(prevItem, "prev") : <span />}
        </div>

        <div className={`col__right ${cardClassName}`.trim()}>
          {nextItem ? renderCard(nextItem, "next") : <span />}
        </div>
      </div>
    </section>
  );
}