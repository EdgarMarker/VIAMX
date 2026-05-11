"use client";

import React, { useCallback, useMemo, useState } from "react";
import type { ProductInterface } from "@/app/_domain/sanity";
import ResponsiveImage from "@/app/common/components/img/ResponsiveImage";
import CustomPortableText from "@/app/common/components/text/CustomPortableText";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./galleries.scss";

interface Props {
  data: ProductInterface;
}

export default function ProductGalleryLightBoxSection({ data }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // ✅ memo: no recalcular en cada render
  const images = useMemo(
    () =>
      data.gallery.list_gallery.map((img) => ({
        src: img.media.url,
        alt: img.alt?.altText || "",
      })),
    [data.gallery.list_gallery]
  );

  const handleOpen = useCallback((idx: number) => {
    setIndex(idx);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

  const handleView = useCallback(({ index }: { index: number }) => {
    setIndex(index);
  }, []);

  return (
    <section className="section__gallery" id="Gallery">
      <div className="column__1 fadeInOut">
        <CustomPortableText
          hasImg={false}
          data={data.gallery.rich_gallery_title}
        />
      </div>

      <div className="column__1">
        <ul className="listado fadeCards">
          {data.gallery.list_gallery.map((img, idx) => (
            <li className="card card__gallery" key={idx}>
              <button
                className="gallery-btn"
                onClick={() => handleOpen(idx)}
                aria-label={`Ver imagen ${idx + 1} en grande`}
                type="button"
              >
                {/* Si tu ResponsiveImage soporta lazy/sizes, aquí sería clave */}
                <ResponsiveImage imageData={img} variant="card" />
              </button>
            </li>
          ))}
        </ul>

        {/* ✅ monta Lightbox SOLO cuando se abre */}
        {open && (
          <Lightbox
            open={open}
            close={handleClose}
            slides={images}
            index={index}
            on={{ view: handleView }}
          />
        )}
      </div>
    </section>
  );
}