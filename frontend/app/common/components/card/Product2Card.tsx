import "./card.scss";
import React from "react";
import ResponsiveImage from "../img/ResponsiveImage";
import Button from "../btn/Button";
import Link from "next/link";
import { Product2Interface } from "@/app/_domain/sanity/product2.contract";

interface Props {
  data: Product2Interface;
}

const Product2Card = ({ data }: Props) => {
  return (
    <div className="card card__product">
      <div className="head">
        <Link href={`/productos2/${data.general.slug.current}`}>
          <ResponsiveImage
            imageData={data.general.img_general_primaryImg}
            variant="card"
          />
        </Link>
      </div>
      <div className="body">
        <span className="category">
          <a
            href={`/productos2/categoria/${data.general.ref_general_category?.general.slug.current}`}
          >
            {data.general.ref_general_category?.general.string_category_name}
          </a>
        </span>
        <h3>
          <Link href={`/productos2/${data.general.slug.current}`}>
            {data.general.string_general_title}
          </Link>
        </h3>
        <p>{data.general.textarea_general_cardExcerpt}</p>
        <Button variant="link" href={`/productos2/${data.general.slug.current}`}>
          Ver producto
        </Button>
      </div>
    </div>
  );
};

export default Product2Card;
