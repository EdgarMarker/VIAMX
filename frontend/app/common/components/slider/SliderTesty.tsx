"use client";
// @ts-expect-error no types
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import React, { useRef } from "react";
import CustomPortableText from "../text/CustomPortableText";
import Svg from "../img/Svg";
import TestyCard from "../card/TestyCard";
import { HomePageInterface } from "@/app/_domain/sanity";

type Props = {
  variant: "Home";
  data: HomePageInterface;
};

const SliderTesty = ({ variant, data }: Props) => {
  const mainSliderRef = useRef<any>(null);
  const splideOptions: any = {
    perPage: 2,
    perMove: 1,
    arrows: false,
    pagination: true,
    drag: true,
    autoplay: false,
    gap: "var(--gap)",
    padding: "5%",
    breakpoints: {
      1024: {
        perPage: 2,
      },
      768: {
        perPage: 1,
      },
    },
  };

  const handlePrev = () => {
    if (mainSliderRef.current) {
      mainSliderRef.current.splide.go("<");
    }
  };

  const handleNext = () => {
    if (mainSliderRef.current) {
      mainSliderRef.current.splide.go(">");
    }
  };

  switch (variant) {
    case "Home":
      return (
        <section className="section__testimonios fadeCards">
          <div className="column__2">
            <div className="col__left">
              <h3 className="head__title"><strong>/</strong> Testimonios</h3>
              <CustomPortableText
                hasImg={false}
                data={data.testy.rich_testy_testyTitle}
              />
            </div>
            <div className="col__right">
              <div className="panel__slide">
                <button
                  type="button"
                  className="slide__prev"
                  onClick={handlePrev}
                >
                  <Svg variant="Arrow" />
                </button>
                <button
                  type="button"
                  className="slide__next"
                  onClick={handleNext}
                >
                  <Svg variant="Arrow" />
                </button>
              </div>
            </div>
          </div>

          <div className="column__1">
            <Splide ref={mainSliderRef} options={splideOptions}>
              {data.testy.arr_ref_testy_testyList.map((product, idx) => (
                <SplideSlide key={idx ?? ""}>
                  <TestyCard data={product} />
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </section>
      );
  }
};

export default SliderTesty;
