"use client";

// @ts-expect-error no types for splide react
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ResponsiveImage from "@/app/common/components/img/ResponsiveImage";
import type { IMG } from "@/app/_domain/sanity/types.d";

export default function GallerySlider({ images }: { images: IMG[] }) {
  if (!images?.length) return null;

  return (
    <div className="gallery__slider">
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          arrows: true,
          pagination: true,
          drag: true,
          speed: 800,
          gap: "0",
        }}
      >
        {images.map((img, idx) => (
          <SplideSlide key={idx}>
            <ResponsiveImage imageData={img} variant="banner" />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
