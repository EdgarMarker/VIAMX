import "./card.scss";
import React from "react";
import { TestimonialInterface } from "@/app/_domain/sanity/testimonial.contract";

interface Props {
  data: TestimonialInterface;
}

const TestyCard = ({ data }: Props) => {
  return (
    <div className="card card__testy">
      <div className="testy__stars">
        <div style={{ width: `${data.grade}%` }}></div>
      </div>
      <div className="testy__opinion">
        <p>{data.textarea_testimonial_content}</p>
      </div>
      <div className="testy__author">
        <h3>{data.string_testimonial_authorName}</h3>
        <h4>{data.string_testimonial_authorLocation}</h4>
      </div>
    </div>
  );
};

export default TestyCard;
