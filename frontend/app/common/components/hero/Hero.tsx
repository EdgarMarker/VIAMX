// /*
// "use client";
// import "./hero.scss";
// import { HomePageInterface } from "@/app/_domain/sanity/homePage.contract";
// import React, { useRef } from "react";
// import ResponsiveImage from "../../components/img/ResponsiveImage";
// import Button from "../btn/Button";
// import ScrollToButton from "../btn/ScrollToButton";
// import CustomPortableText from "../../components/text/CustomPortableText";
// import Column2 from "../../components/layout/Column2";
// import { startHero } from "../../lib/gsap/hero.animations";
// import { useGSAP } from "@gsap/react";
// import { AboutPageInterface, BlogPageInterface, CatalogPageInterface, ContactPageInterface, PostInterface, Product2Interface, ProductInterface } from "@/app/_domain/sanity";
// import Link from "next/link";
// 
// type HeroProps =
//   {
//     variant: "home";
//     data: HomePageInterface;
//   }
//   |
//   {
//     variant: "about";
//     data: AboutPageInterface;
//   }
//   |
//   {
//     variant: "contact";
//     data: ContactPageInterface;
//   }
//   |
//   {
//     variant: "blog";
//     data: BlogPageInterface;
//   }
//   |
//   {
//     variant: "catalog-productos";
//     data: CatalogPageInterface;
//   }
//   |
//   {
//     variant: "catalog-productos2";
//     data: CatalogPageInterface;
//   }
//   |
//   {
//     variant: "post";
//     data: PostInterface;
//   }
//   |
//   {
//     variant: "product";
//     data: ProductInterface;
//   }
//   |
//   {
//     variant: "product2";
//     data: Product2Interface;
//   }
//   ;
// 
// const Hero = ({ variant, data }: HeroProps) => {
//   const sectionRef = useRef<HTMLElement | null>(null);
//   const leftRef = useRef<HTMLDivElement | null>(null);
//   const rightRef = useRef<HTMLDivElement | null>(null);
// 
//   const h1El = useRef<HTMLHeadingElement | null>(null);
//   const portableTextEl = useRef<HTMLDivElement | null>(null);
//   const btnEl = useRef<HTMLDivElement | null>(null);
// 
//   const breadEl = useRef<HTMLDivElement | null>(null);
//   const imgEl = useRef<HTMLDivElement | null>(null);
// 
//   useGSAP(
//     () => {
//       startHero({
//         breadEl: ".breadcrumbs",
//         h1El: "h1",
//         h2El: ".portableText h2, .portableText h3",
//         pEl: ".portableText p",
//         imgEl: ".col__right, .image__wrapper",
//         btnEl: ".btn__wrapper",
//       });
//     },
//     { dependencies: [variant], scope: sectionRef },
//   );
//   switch (variant) {
//     //?--> HOME -----
//     case "home":
//       return (
//         <Column2
//           sectionClassName="section__hero section__hero--home"
//           sectionRef={sectionRef}
//           leftRef={leftRef}
//           rightRef={rightRef}
//           sectionProps={{ "data-anim-hero": true }}
//           leftChildren={
//             <>
//               <h1 ref={h1El}>{data.hero.string_hero_h1}</h1>
// 
//               <div ref={portableTextEl}>
//                 <CustomPortableText
//                   hasImg={false}
//                   data={data.hero.rich_hero_title}
//                 />
//               </div>
// 
//               <div className="btn__wrapper" ref={btnEl}>
//                 <ScrollToButton to="#section__intro" className="btn btn__scroll">
//                   {data.hero.string_hero_cta}
//                 </ScrollToButton>
//                 <Button variant="link" href="/productos">
//                   Ver productos
//                 </Button>
//               </div>
//             </>
//           }
//           rightChildren={
//             <ResponsiveImage
//               imageData={data.hero.img_hero_banner}
//               variant="hero"
//             />
//           }
//         />
//       );
//     case "about":
//       return (
//         <Column2
//           sectionClassName="section__hero section__hero--about"
//           sectionRef={sectionRef}
//           leftRef={leftRef}
//           rightRef={rightRef}
//           sectionProps={{ "data-anim-hero": true }}
//           leftChildren={
//             <>
//               <h1 ref={h1El}>{data.hero.string_hero_h1}</h1>
// 
//               <div ref={portableTextEl}>
//                 <CustomPortableText
//                   hasImg={false}
//                   data={data.hero.rich_hero_title}
//                 />
//               </div>
// 
//               <div className="btn__wrapper" ref={btnEl}>
//                 <ScrollToButton to="#section__intro" className="btn btn__scroll">
//                   {data.hero.string_hero_cta}
//                 </ScrollToButton>
//                 <Button variant="link" href="/productos">
//                   Ver productos
//                 </Button>
//               </div>
//             </>
//           }
//           rightChildren={
//             <ResponsiveImage
//               imageData={data.hero.img_hero_banner}
//               variant="hero"
//             />
//           }
//         />
//       );
//     case "contact":
//       return (
//         <Column2
//           sectionClassName="section__hero section__hero--contact"
//           sectionRef={sectionRef}
//           leftRef={leftRef}
//           rightRef={rightRef}
//           sectionProps={{ "data-anim-hero": true }}
//           leftChildren={
//             <>
//               <h1 ref={h1El}>{data.hero.string_hero_h1}</h1>
// 
//               <div ref={portableTextEl}>
//                 <CustomPortableText
//                   hasImg={false}
//                   data={data.hero.rich_hero_title}
//                 />
//               </div>
// 
//               <div className="btn__wrapper" ref={btnEl}>
//                 <ScrollToButton to="#section__intro" className="btn btn__scroll">
//                   {data.hero.string_hero_cta}
//                 </ScrollToButton>
//                 <Button variant="link" href="/productos">
//                   Ver productos
//                 </Button>
//               </div>
//             </>
//           }
//           rightChildren={
//             <ResponsiveImage
//               imageData={data.hero.img_hero_banner}
//               variant="hero"
//             />
//           }
//         />
//       );
//     case "blog":
//       return (
//         <Column2
//           sectionClassName="section__hero section__hero--blog"
//           sectionRef={sectionRef}
//           leftRef={leftRef}
//           rightRef={rightRef}
//           sectionProps={{ "data-anim-hero": true }}
//           leftChildren={
//             <>
//               <h1 ref={h1El}>{data.hero.string_hero_h1}</h1>
// 
//               <div ref={portableTextEl}>
//                 <CustomPortableText
//                   hasImg={false}
//                   data={data.hero.rich_hero_title}
//                 />
//               </div>
// 
//               <div className="btn__wrapper" ref={btnEl}>
//                 <ScrollToButton to="#sectionBlog" className="btn btn__scroll">
//                   {data.hero.string_hero_cta}
//                 </ScrollToButton>
//                 <Button variant="link" href="/productos">
//                   Ver productos
//                 </Button>
//               </div>
//             </>
//           }
//           rightChildren={
//             <ResponsiveImage
//               imageData={data.hero.img_hero_banner}
//               variant="hero"
//             />
//           }
//         />
//       );
//     case "catalog-productos":
//       return (
//         <Column2
//           sectionClassName="section__hero section__hero--productos"
//           sectionRef={sectionRef}
//           leftRef={leftRef}
//           rightRef={rightRef}
//           sectionProps={{ "data-anim-hero": true }}
//           leftChildren={
//             <>
//               <h1 ref={h1El}>{data.producto.obj_producto_hero.string_hero_h1}</h1>
// 
//               <div ref={portableTextEl}>
//                 <CustomPortableText
//                   hasImg={false}
//                   data={data.producto.obj_producto_hero.rich_hero_title}
//                 />
//               </div>
// 
//               <div className="btn__wrapper" ref={btnEl}>
//                 <ScrollToButton to="#section__products" className="btn btn__scroll">
//                   {data.producto.obj_producto_hero.string_hero_cta}
//                 </ScrollToButton>
//               </div>
//             </>
//           }
//           rightChildren={
//             <ResponsiveImage
//               imageData={data.producto.obj_producto_hero.img_hero_banner}
//               variant="hero"
//             />
//           }
//         />
//       );
//     case "catalog-productos2":
//       return (
//         <Column2
//           sectionClassName="section__hero section__hero--productos2"
//           sectionRef={sectionRef}
//           leftRef={leftRef}
//           rightRef={rightRef}
//           sectionProps={{ "data-anim-hero": true }}
//           leftChildren={
//             <>
//               <h1 ref={h1El}>{data.servicio.obj_servicio_hero.string_hero_h1}</h1>
// 
//               <div ref={portableTextEl}>
//                 <CustomPortableText
//                   hasImg={false}
//                   data={data.servicio.obj_servicio_hero.rich_hero_title}
//                 />
//               </div>
// 
//               <div className="btn__wrapper" ref={btnEl}>
//                 <ScrollToButton to="#section__products" className="btn btn__scroll">
//                   {data.servicio.obj_servicio_hero.string_hero_cta}
//                 </ScrollToButton>
//               </div>
//             </>
//           }
//           rightChildren={
//             <ResponsiveImage
//               imageData={data.servicio.obj_servicio_hero.img_hero_banner}
//               variant="hero"
//             />
//           }
//         />
//       );
//     case "product":
//       return (
//         <Column2
//           sectionClassName="section__hero section__hero--product"
//           sectionRef={sectionRef}
//           leftRef={leftRef}
//           rightRef={rightRef}
//           sectionProps={{ "data-anim-hero": true }}
//           leftChildren={
//             <>
//               <div className="breadcrumbs" ref={breadEl}>
//                 <span>
//                   <Link href="/productos">Productos</Link>
//                   {" / "}
//                   <Link
//                     href={`/productos/categoria/${data.general.ref_general_category?.general.slug.current}`}
//                   >
//                     {data.general.ref_general_category?.general.string_category_name}
//                   </Link>
//                 </span>
//               </div>
//               <h1 ref={h1El}>{data.general.string_general_title}</h1>
//               <p>{data.general.textarea_general_cardExcerpt}</p>
//             </>
//           }
//           rightChildren={
//             <div ref={imgEl}>
//               <ResponsiveImage
//                 imageData={data.general.img_general_primaryImg}
//                 variant="hero"
//               />
//             </div>
//           }
//         />
//       );
//     case "product2":
//       return (
//         <Column2
//           sectionClassName="section__hero section__hero--product2"
//           sectionRef={sectionRef}
//           leftRef={leftRef}
//           rightRef={rightRef}
//           sectionProps={{ "data-anim-hero": true }}
//           leftChildren={
//             <>
//               <div className="breadcrumbs" ref={breadEl}>
//                 <span>
//                   <Link href="/productos2">Productos 2</Link>
//                   {" / "}
//                   <Link
//                     href={`/productos2/categoria/${data.general.ref_general_category?.general.slug.current}`}
//                   >
//                     {data.general.ref_general_category?.general.string_category_name}
//                   </Link>
//                 </span>
//               </div>
//               <h1 ref={h1El}>{data.general.string_general_title}</h1>
//               <p>{data.general.textarea_general_cardExcerpt}</p>
//             </>
//           }
//           rightChildren={
//             <div ref={imgEl}>
//               <ResponsiveImage
//                 imageData={data.general.img_general_primaryImg}
//                 variant="hero"
//               />
//             </div>
//           }
//         />
//       );
//     case "post":
//       return (
//         <section className="section__hero" ref={sectionRef} data-anim-hero>
//           <div className="column__1">
//             <div className="breadcrumbs" ref={breadEl}>
//               <span>
//                 <Link href={"/blog"}>
//                   Blog
//                 </Link>
//                 {" / "}
//                 <Link href={`/blog/categoria/${data.general.ref_general_category?.general.slug.current}`}>
//                   {data.general.ref_general_category?.general.string_category_name}
//                 </Link>
//               </span>
//             </div>
//             <div className="heading">
//               <h1 ref={h1El}>{data.general.string_general_title}</h1>
//             </div>
//             <div className="author">
//               <span>
//                 {"Por "}
//                 <strong>{data.general.ref_general_author?.string_author_name}</strong>
//                 {" | "}
//                 {data.general.date}
//               </span>
// 
//             </div>
//             <div className="image__wrapper" ref={imgEl}>
//               <ResponsiveImage
//                 imageData={data.general.img_general_primaryImg}
//                 variant="hero"
//               />
//             </div>
//           </div>
//         </section>
//       );
//   }
// };
// 
// export default Hero;
// */

export default (() => null) as any;
