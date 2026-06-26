import "./card.scss";
import React from "react";
import ResponsiveImage from "../img/ResponsiveImage";
import Link from "next/link";
import { ProductInterface } from "@/app/_domain/sanity/product.contract";

type Variant = "catalog" | "primary";

interface Props {
  data: ProductInterface;
  variant?: Variant;
}

const ProductCard = ({ data, variant = "catalog" }: Props) => {
  const href = `/productos/${data.general.slug.current}`;

  switch (variant) {

   
    case "primary":
      return (
        <div className="card card__product card__product--primary">
          <div className="card__img">
            <Link href={href}>
              <ResponsiveImage imageData={data.general.img_general_card} variant="card" className="highlight-left" />
            </Link>
          </div>
          <div className="card__body">
            <h3 className="card__name">
              <Link href={href}>{data.general.string_general_name}</Link>
            </h3>
            <hr className="card__divider" />
            {data.general.textarea_general_card_dsc && (
              <p className="card__dsc">
                <strong>Colonia: {data.general.textarea_general_card_dsc}</strong>
              </p>
            )}
            {data.general.date && (
              <span className="card__date">Año: {data.general.date.slice(0, 4)}</span>
            )}
          </div>
        </div>
      );

   
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
            <Link href={href} className="btn">
              IR AL PROYECTO
            </Link>
          </div>
        </div>
      );
  }
};

export default ProductCard;
