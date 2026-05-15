import "./card.scss";
import React from "react";
import ResponsiveImage from "../img/ResponsiveImage";
import Button from "../btn/Button";
import Link from "next/link";
import { ProductInterface } from "@/app/_domain/sanity/product.contract";

type Variant = "catalog" | "primary" | "timeline";

interface Props {
  data: ProductInterface;
  variant?: Variant;
}

const ProductCard = ({ data, variant = "catalog" }: Props) => {
  const href = `/productos/${data.general.slug.current}`;

  switch (variant) {

    // Tarjeta vertical: imagen arriba, borde izquierdo amarillo, info abajo
    case "primary":
      return (
        <div className="card card__product card__product--primary">
          <div className="card__img">
            <Link href={href}>
              <ResponsiveImage imageData={data.general.img_general_card} variant="card" />
            </Link>
          </div>
          <div className="card__body">
            <h3 className="card__name">
              <Link href={href}>{data.general.string_general_name}</Link>
            </h3>
            {data.general.textarea_general_card_dsc && (
              <p className="card__dsc">{data.general.textarea_general_card_dsc}</p>
            )}
            {data.general.date && (
              <span className="card__date">Año: {data.general.date}</span>
            )}
          </div>
        </div>
      );

    // Tarjeta vertical: cabecera amarilla (nombre + año), imagen grande, CTA abajo
    case "timeline":
      return (
        <div className="card card__product card__product--timeline">
          <div className="card__header">
            <h3 className="card__name">{data.general.string_general_name}</h3>
            {data.general.date && (
              <span className="card__date">{data.general.date}</span>
            )}
          </div>
          <div className="card__img">
            <Link href={href}>
              <ResponsiveImage imageData={data.general.img_general_card} variant="banner" />
            </Link>
          </div>
          <div className="card__footer">
            <Link href={href} className="card__cta">Ver proyecto</Link>
          </div>
        </div>
      );

    // Tarjeta horizontal: imagen izquierda, contenido derecha con CTA
    case "catalog":
    default:
      return (
        <div className="card card__product card__product--catalog">
          <div className="card__img">
            <Link href={href}>
              <ResponsiveImage imageData={data.general.img_general_card} variant="banner" />
            </Link>
          </div>
          <div className="card__body">
            <h3 className="card__name">
              <Link href={href}>{data.general.string_general_name}</Link>
            </h3>
            <hr className="card__divider" />
            {data.general.textarea_general_card_dsc && (
              <p className="card__dsc">
                <strong>{data.general.textarea_general_card_dsc}</strong>
              </p>
            )}
            {data.general.date && (
              <span className="card__date">Año: {data.general.date}</span>
            )}
            <Button variant="link" href={href}>
              IR AL PROYECTO
            </Button>
          </div>
        </div>
      );
  }
};

export default ProductCard;
