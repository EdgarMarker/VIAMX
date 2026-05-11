import "./card.scss";
import React from "react";
import ResponsiveImage from "../img/ResponsiveImage";
import Link from "next/link";
import Button from "../btn/Button";
import { PostInterface } from "@/app/_domain/sanity/post.contract";
type variants = "home" | "catalog";

interface Props {
  data: PostInterface;
}
const PostCard = ({ data }: Props) => {
  return (
    <div className="card card__post">
      <div className="head">
        <Link href={`/blog/${data.general.slug.current}`}>
          <ResponsiveImage
            imageData={data.general.img_general_primaryImg}
          />
        </Link>
      </div>
      <div className="body">
        <span className="category">
          <Link
            href={`/blog/categoria/${data.general.ref_general_category?.general?.slug?.current}`}
          >
            {data.general.ref_general_category?.general?.string_category_name}
          </Link>
        </span>
        <span className="author">
          Escrito por{" "}
          <strong>
            {data.general.ref_general_author?.string_author_name}
          </strong>{" "}
          el <strong>{data.general.date}</strong>
        </span>
        <h3>
          <Link href={`/blog/${data.general.slug.current}`}>
            {data.general.string_general_title}
          </Link>
        </h3>
        <p>{data.general.textarea_general_cardExcerpt}</p>
        <Button variant="link" href={`/blog/${data.general.slug.current}`}>
          Leer Más
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
