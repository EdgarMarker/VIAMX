"use client";

import React, { useRef } from "react";
// @ts-expect-error no types for splide
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./slider.scss";

import type { IMG, Block } from "@/app/_domain/sanity/types.d";
import ResponsiveImage from "../img/ResponsiveImage";
import CustomPortableText from "../text/CustomPortableText";
import Svg from "../img/Svg";

export interface ProductModel {
  string_models_modelName: string;
  rich_models_modelDescription: Block[];
  img_models_modelImg: IMG;
}

interface SliderProductModelProps {
  title?: Block[];
  models: ProductModel[];
}

const SliderProductModel = ({ title, models }: SliderProductModelProps) => {
  const mainSliderRef = useRef<any>(null);

  const splideOptions = {
    type: "fade",
    perPage: 1,
    perMove: 1,
    arrows: false,
    pagination: false,
    drag: true,
    gap: "0rem",
    speed: 800,
    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    breakpoints: {
      1024: { perPage: 1 },
    },
  };

  const handlePrev = () => {
    if (mainSliderRef.current?.splide) mainSliderRef.current.splide.go("<");
  };

  const handleNext = () => {
    if (mainSliderRef.current?.splide) mainSliderRef.current.splide.go(">");
  };

  const hasControls = models.length > 1;

  if (!models?.length) return null;


  return (
    <section className="section__models__slider">
        <div className="column__2">
            <div className="col__left">
            {title?.length ? (
                <CustomPortableText data={title} hasImg={false} />
            ) : null}
            </div>
            <div className="col__right">
                {hasControls ? (
                    <div className="panel__slide">
                    <button
                        type="button"
                        className="slide__btn slide__prev"
                        onClick={handlePrev}
                        aria-label="Anterior"
                    >
                        <Svg variant="Arrow" />
                    </button>
                    <button
                        type="button"
                        className="slide__btn slide__next"
                        onClick={handleNext}
                        aria-label="Siguiente"
                    >
                        <Svg variant="Arrow" />
                    </button>
                    </div>
                ) : null}
            </div>
        </div>

        <div className="column__1">
            <Splide ref={mainSliderRef} options={splideOptions}>
            {models.map((model, idx) => (
                <SplideSlide key={idx}>
                <div className="model__slide-content">
                    <div className="column__2">
                    <div className="col__left">
                        <div className="model__info">
                        <span className="model__counter">
                            {String(idx + 1).padStart(2, "0")} /{" "}
                            {String(models.length).padStart(2, "0")}
                        </span>
                        <h3 className="model__name">{model.string_models_modelName}</h3>
                        <div className="model__description">
                            <CustomPortableText
                            data={model.rich_models_modelDescription}
                            hasImg={false}
                            />
                        </div>
                        </div>
                    </div>

                    <div className="col__right">
                        <div className="model__image-wrapper fadeCards">
                        <ResponsiveImage
                            imageData={model.img_models_modelImg}
                            variant="hero"
                        />
                        </div>
                    </div>
                    </div>
                </div>
                </SplideSlide>
            ))}
            </Splide>
        </div>
    </section>
  );
};

export default SliderProductModel;