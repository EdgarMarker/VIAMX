import "./card.scss";
import React from "react";
import ResponsiveImage from "../img/ResponsiveImage";
import Link from "next/link";
import { PostInterface } from "@/app/_domain/sanity/post.contract";

interface Props {
  data: PostInterface;
}

const PostCard = ({ data }: Props) => {
  return (
    <div className="card card__post">
      <div className="card__img">
        <Link href={`/blog/${data.general.slug.current}`}>
          <ResponsiveImage imageData={data.general.img_general_primaryImg} variant="card" />
        </Link>
      </div>
      <div className="card__body">
        <span className="card__meta">
          Escrito por <strong>{data.general.ref_general_author?.string_author_name}</strong>
          {" · "}
          <strong>{data.general.date}</strong>
        </span>
        {data.general.ref_general_category && (
          <span className="card__category">
            <Link href={`/blog/categoria/${data.general.ref_general_category.general.slug.current}`}>
              {data.general.ref_general_category.general.string_category_name}
            </Link>
          </span>
        )}
        <h3 className="card__name">
          <Link href={`/blog/${data.general.slug.current}`}>
            {data.general.string_general_title}
          </Link>
        </h3>
        {data.general.textarea_general_cardExcerpt && (
          <p className="card__dsc">{data.general.textarea_general_cardExcerpt}</p>
        )}
        <Link href={`/blog/${data.general.slug.current}`} className="btn">
          Leer más
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
