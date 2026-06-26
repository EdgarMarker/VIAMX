import React from "react";
import Button from "@/app/common/components/btn/Button";
import CustomPortableText from "@/app/common/components/text/CustomPortableText";
import ResponsiveImage from "@/app/common/components/img/ResponsiveImage";
import type { IMG as ImageType, Block } from "@/app/_domain/sanity/types";

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

type ColumnProps = {
  h1?: string | null;
  h3?: string | null;
  h3ClassName?: string | null;
  imageClassName?: string | null;
  h2?: string | null;
  p?: string | null;
  portableText?: Block[] | null;
  hasImgInPortableText?: boolean;
  button?: ButtonProps | null;
  image?: ImageProps | null;
  children?: React.ReactNode;
};

function ColumnContent({
  h1,
  h3,
  h3ClassName,
  imageClassName,
  h2,
  p,
  portableText,
  hasImgInPortableText = false,
  button,
  image,
  children,
}: ColumnProps) {
  const hasPortable = Array.isArray(portableText) && portableText.length > 0;

  return (
    <>
      {h1 ? <h1>{h1}</h1> : null}
      {h3 ? <h3 className={`head__title ${h3ClassName || ""}`.trim()}><strong>/</strong> {h3}</h3> : null}
      {h2 ? <h2>{h2}</h2> : null}
      {p ? <p>{p}</p> : null}

      {hasPortable ? (
        <CustomPortableText hasImg={hasImgInPortableText} data={portableText!} />
      ) : null}

      {button?.href && button?.label ? (
        <Button
          variant="link"
          href={button.href}
          className={button.className}
          target={button.target}
        >
          {button.label}
        </Button>
      ) : null}

      {image?.imageData ? (
        <ResponsiveImage
          imageData={image.imageData}
          variant={image.variant ?? "icon"}
          className={image.className || imageClassName || ""}
        />
      ) : null}

      {children}
    </>
  );
}

type Props = {
  id?: string;
  sectionClassName?: string;
  columnClassName?: string;
  leftClassName?: string;
  rightClassName?: string;
  reverseClassName?: string;
  sectionRef?: React.Ref<HTMLElement>;
  leftRef?: React.Ref<HTMLDivElement>;
  rightRef?: React.Ref<HTMLDivElement>;
  sectionProps?: SectionProps;

  leftH1?: string | null;
  leftH3?: string | null;
  leftH3ClassName?: string | null;
  leftH2?: string | null;
  leftP?: string | null;
  leftPortableText?: Block[] | null;
  leftHasImgInPortableText?: boolean;
  leftButton?: ButtonProps | null;
  leftImage?: ImageProps | null;
  leftChildren?: React.ReactNode;

  rightH1?: string | null;
  rightH3?: string | null;
  rightH3ClassName?: string | null;
  rightH2?: string | null;
  rightP?: string | null;
  rightPortableText?: Block[] | null;
  rightHasImgInPortableText?: boolean;
  rightButton?: ButtonProps | null;
  rightImage?: ImageProps | null;
  rightChildren?: React.ReactNode;
  imageClassName?: string | null;
};

export default function Column2({
  id,
  sectionClassName = "",
  columnClassName = "",
  leftClassName = "col__left",
  rightClassName = "col__right",
  reverseClassName = "",
  sectionRef,
  leftRef,
  rightRef,
  sectionProps,
  leftH1,
  leftH3,
  leftH3ClassName,
  leftH2,
  leftP,
  leftPortableText,
  leftHasImgInPortableText = false,
  leftButton,
  leftImage,
  leftChildren,
  rightH1,
  rightH3,
  rightH3ClassName,
  rightH2,
  rightP,
  rightPortableText,
  rightHasImgInPortableText = false,
  rightButton,
  rightImage,
  rightChildren,
  imageClassName
}: Props) {
  const hasLeft =
    !!leftChildren ||
    !!leftH1 ||
    !!leftH3 ||
    !!leftH2 ||
    !!leftP ||
    (Array.isArray(leftPortableText) && leftPortableText.length > 0) ||
    !!leftButton ||
    !!leftImage;

  const hasRight =
    !!rightChildren ||
    !!rightH1 ||
    !!rightH3 ||
    !!rightH2 ||
    !!rightP ||
    (Array.isArray(rightPortableText) && rightPortableText.length > 0) ||
    !!rightButton ||
    !!rightImage;

  return (
    <section
      id={id}
      ref={sectionRef}
      className={sectionClassName}
      {...sectionProps}
    >
      <div className={`column__2 ${reverseClassName} ${columnClassName}`.trim()}>
        <div className={leftClassName} ref={leftRef}>
          {hasLeft ? (
            leftChildren ? (
              leftChildren
            ) : (
              <ColumnContent
                h1={leftH1}
                h3={leftH3}
                h3ClassName={leftH3ClassName}
                h2={leftH2}
                p={leftP}
                portableText={leftPortableText}
                hasImgInPortableText={leftHasImgInPortableText}
                button={leftButton}
                image={leftImage}
              />
            )
          ) : null}
        </div>

        <div className={rightClassName} ref={rightRef}>
          {hasRight ? (
            rightChildren ? (
              rightChildren
            ) : (
              <ColumnContent
                h1={rightH1}
                h3={rightH3}
                h3ClassName={rightH3ClassName}
                h2={rightH2}
                p={rightP}
                portableText={rightPortableText}
                hasImgInPortableText={rightHasImgInPortableText}
                button={rightButton}
                image={rightImage}
                imageClassName={imageClassName}
              />
            )
          ) : null}
        </div>
      </div>
    </section>
  );
}
