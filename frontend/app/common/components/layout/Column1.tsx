// import React from "react";
// import Link from "next/link";
// import CustomPortableText from "@/app/common/components/text/CustomPortableText";
// import ResponsiveImage from "@/app/common/components/img/ResponsiveImage";
// import type { IMG as ImageType, Block } from "@/app/_domain/sanity/types.d";
// 
// type ButtonProps = {
//   href: string;
//   label: string;
//   className?: string; // ej: "btn btn__primary"
//   target?: "_blank" | "_self";
//   rel?: string;
// };
// 
// type ImageProps = {
//   imageData: ImageType;
//   variant?: "hero" | "card" | "thumbnail" | "gallery" | "icon" | "banner";
//   className?: string;
// };
// 
// // ✅ habilita data-* en objetos tipados
// type DataAttributes = {
//   [K in `data-${string}`]?: string | number | boolean | undefined;
// };
// 
// type SectionProps = React.ComponentPropsWithoutRef<"section"> & DataAttributes;
// type DivProps = React.ComponentPropsWithoutRef<"div"> & DataAttributes;
// 
// type Props = {
//   id?: string;
//   sectionClassName?: string; // clase del <section>
//   columnClassName?: string; // clase extra del <div className="column__1">
// 
//   // ✅ extra props (aria, role, style, data-*, etc.)
//   sectionProps?: SectionProps;
//   columnProps?: DivProps;
// 
//   h1?: string | null;
//   h3?: string | null;
//   h2?: string | null;
//   p?: string | null;
// 
//   portableText?: Block[] | null;
//   hasImgInPortableText?: boolean;
// 
//   button?: ButtonProps | null;
//   image?: ImageProps | null;
// 
//   children?: React.ReactNode;
// };
// 
// export default function Column1({
//   id,
//   sectionClassName = "",
//   columnClassName = "",
//   sectionProps,
//   columnProps,
//   h1,
//   h3,
//   h2,
//   p,
//   portableText,
//   hasImgInPortableText = false,
//   button,
//   image,
//   children,
// }: Props) {
//   const hasPortable = Array.isArray(portableText) && portableText.length > 0;
// 
//   return (
//     <section id={id} className={sectionClassName} {...sectionProps}>
//       <div className={`column__1 ${columnClassName}`.trim()} {...columnProps}>
//         {h1 ? <h1>{h1}</h1> : null}
//         {h3 ? <h3>{h3}</h3> : null}
//         {h2 ? <h2>{h2}</h2> : null}
//         {p ? <p>{p}</p> : null}
// 
//         {hasPortable ? (
//           <CustomPortableText hasImg={hasImgInPortableText} data={portableText!} />
//         ) : null}
// 
//         {button?.href && button?.label ? (
//           <Link
//             href={button.href}
//             className={button.className ?? "btn"}
//             target={button.target}
//             rel={button.rel}
//           >
//             {button.label}
//           </Link>
//         ) : null}
// 
//         {image?.imageData ? (
//           <ResponsiveImage
//             imageData={image.imageData}
//             variant={image.variant ?? "icon"}
//             className={image.className}
//           />
//         ) : null}
// 
//         {children}
//       </div>
//     </section>
//   );
// }
// 
// 
// {/*
//   
// USO COMPLETO:
// 
// <Column1
//   id="intro"
//   sectionClassName="section__intro fadeInOut"
//   columnClassName="custom-col-1"
//   sectionProps={{
//     "data-anim-hero": false,
//     style: { backgroundColor: "transparent" },
//   }}
//   columnProps={{
//     "data-layout": "one-col",
//     style: { width: "auto" },
//   }}
//   h1="Título H1"
//   h3="Subtítulo H3"
//   h2="Título H2"
//   p="Texto de párrafo"
// 
//   portableText={data.intro.list_block_title_intro_description}
//   hasImgInPortableText={false}
//   button={{
//     href: "/contacto",
//     label: "Contáctanos",
//     className: "btn btn__primary",
//     target: "_self",
//     rel: "noopener noreferrer",
//   }}
// 
//   image={{
//     imageData: data.intro.img_intro_sectionImage,
//     variant: "banner",
//     className: "img__custom",
//   }}
// />
// 
//   
// */}

export default (() => null) as any;
