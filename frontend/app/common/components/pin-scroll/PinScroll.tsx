"use client";

import React, { useRef } from "react";
import "./pin-scroll.scss";
import jsonData from "./pin-scroll.data.json";
import { useAnimatePinScroll } from "../../components/pin-scroll/pin-scroll.animate";
import CustomPortableText from "../text/CustomPortableText";
import { AboutPageInterface } from "@/app/_domain/sanity";
import ResponsiveImage from "../../components/img/ResponsiveImage";

type PinScrollProps =
  | {
    variant?: "default";
  }
  | {
    variant: "about";
    data: AboutPageInterface;
  };

const PinScroll = (props: PinScrollProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  const { variant = "default" } = props;

  useAnimatePinScroll(wrapperRef, leftRef, pinRef);

  switch (variant) {
    case "about": {
      const { data } = props as { data: AboutPageInterface };
      return (
        <section className="section__pinScroll">
          <div className="column__1">
            <CustomPortableText hasImg={false} data={data.values.rich_values_sectionTitle} />
          </div>

          <div className="column__2" ref={wrapperRef}>
            <div className="col__left" ref={leftRef}>
              <ul className="pin__list" role="list">
                {data.values.arr_values_valuesList.map((item, index) => (
                  <li key={index} className="pin__item">
                    <div className="card pin__content__card">
                      <h2>{item.string_values_valueTitle}</h2>
                      <p>{item.textarea_values_valueDescription}</p>

                      <div className="desk-hidden">
                        <ResponsiveImage imageData={item.icon_values_valueIcon} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col__right">
              <div className="card pin__img__card" ref={pinRef}>
                {data.values.arr_values_valuesList.map((item, index) => (
                  <ResponsiveImage key={index} imageData={item.icon_values_valueIcon} />
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    }

    default:
      return (
        <section className="section__pinScroll">
          <div className="column__1">
            <h2>{jsonData.data.title.h2}</h2>
            <p>{jsonData.data.title.p}</p>
          </div>

          <div className="column__2" ref={wrapperRef}>
            <div className="col__left" ref={leftRef}>
              <ul className="pin__list" role="list">
                {jsonData.data.items.map((item, index) => (
                  <li key={item.id ?? index} className="pin__item">
                    <div className="card pin__content__card">
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>

                      <div className="desk-hidden">
                        <img src={item.img} alt={item.title} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col__right">
              <div className="card pin__img__card" ref={pinRef}>
                {jsonData.data.items.map((item, index) => (
                  <img
                    key={item.id ?? index}
                    src={item.img}
                    alt={item.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      );
  }
};


export default PinScroll;