import React from "react";
import Link from "next/link";
import CustomPortableText from "@/app/common/components/text/CustomPortableText";
import ResponsiveImage from "@/app/common/components/img/ResponsiveImage";
import type { IMG as ImageType, Block } from "@/app/_domain/sanity/types.d";

type ButtonProps = {
  href: string;
  label: string;
  className?: string;
  target?: "_blank" | "_self";
  rel?: string;
};

type ImageProps = {
  imageData: ImageType;
  variant?: "hero" | "card" | "thumbnail" | "gallery" | "icon" | "banner";
  className?: string;
};

type DataAttributes = {
  [K in `data-${string}`]?: string | number | boolean | undefined;
};

type SectionProps = React.ComponentPropsWithoutRef<"section"> & DataAttributes;
type DivProps = React.ComponentPropsWithoutRef<"div"> & DataAttributes;

type Props = {
  id?: string;
  sectionClassName?: string;
  columnClassName?: string;
  sectionProps?: SectionProps;
  columnProps?: DivProps;
  h1?: string | null;
  h3?: string | null;
  h3ClassName?: string | null; 
  h2?: string | null;
  p?: string | null;
  portableText?: Block[] | null;
  hasImgInPortableText?: boolean;
  button?: ButtonProps | null;
  image?: ImageProps | null;
  children?: React.ReactNode;
};

export default function Column1({
  id,
  sectionClassName = "",
  columnClassName = "",
  sectionProps,
  columnProps,
  h1,
  h3,
  h3ClassName,
  h2,
  p,
  portableText,
  hasImgInPortableText = false,
  button,
  image,
  children,
}: Props) {
  const hasPortable = Array.isArray(portableText) && portableText.length > 0;

  return (
    <section id={id} className={sectionClassName} {...sectionProps}>
      <div className={`column__1 ${columnClassName}`.trim()} {...columnProps}>
        {h1 ? <h1>{h1}</h1> : null}
        {h3 ? <h3 className={`head__title ${h3ClassName || ""}`}><strong>/</strong> {h3}</h3> : null}
        {h2 ? <h2>{h2}</h2> : null}
        {p ? <p>{p}</p> : null}

        {hasPortable ? (
          <CustomPortableText hasImg={hasImgInPortableText} data={portableText!} />
        ) : null}

        {button?.href && button?.label ? (
          <Link
            href={button.href}
            className={button.className ?? "btn"}
            target={button.target}
            rel={button.rel}
          >
            {button.label}
          </Link>
        ) : null}

        {image?.imageData ? (
          <ResponsiveImage
            imageData={image.imageData}
            variant={image.variant ?? "icon"}
            className={image.className}
          />
        ) : null}

        {children}
      </div>
    </section>
  );
}
