// import "./page.scss";
// 
// import {
//   getProductBySlug,
//   getProducts,
// } from "@/app/_domain/sanity";
// 
// import ResponsiveImage from "@/app/common/components/img/ResponsiveImage";
// import CustomPortableText from "@/app/common/components/text/CustomPortableText";
// import PreFooter from "@/app/common/components/footer/PreFooter";
// import Link from "next/link";
// 
// import Gallery from "@/app/common/components/gallery/Gallery";
// import Icon from "@/app/common/components/img/SanityIcon";
// import Hero from "@/app/common/components/hero/Hero";
// import Svg from "@/app/common/components/img/Svg";
// import SliderProductModel from "@/app/common/components/slider/SliderProductModel";
// import { getPageMetadata } from "@/app/common/utils/helper-seo";
// import DivisorImage from "@/app/common/components/divisor/DivisorImage";
// import EmbedVideo from "@/app/common/components/divisor/EmbedVideo";
// import Column1 from "@/app/common/components/layout/Column1";
// import PrevNextSection from "@/app/common/components/nav/PrevNextSection";
// 
// type PageProps = {
//   params: Promise<{ slug: string }>;
// };
// 
// export async function generateMetadata({ params }: PageProps) {
//   const { slug } = await params;
//   return getPageMetadata(() => getProductBySlug(slug));
// }
// 
// const page = async ({ params }: PageProps) => {
//   const { slug } = await params;
// 
//   const data = await getProductBySlug(slug);
//   if (!data) return null;
// 
//   const recentProducts = await getProducts();
// 
//   const orderedProducts = [...recentProducts].sort(
//     (a, b) =>
//       new Date(b.general.date).getTime() - new Date(a.general.date).getTime()
//   );
// 
//   const currentIndex = orderedProducts.findIndex(
//     (product) => product.general.slug.current === slug
//   );
// 
//   const prevProduct = orderedProducts[currentIndex - 1];
//   const nextProduct = orderedProducts[currentIndex + 1];
// 
//   return (
//     <main id="ProductDetail">
//       <Hero variant="product" data={data} />
// 
//       <section className="section__intro fadeInOut">
//         <div className="column__2">
//           <div className="col__left">
//             <ResponsiveImage
//               imageData={data.intro.img_intro_img}
//               variant="banner"
//             />
//           </div>
//           <div className="col__right">
//             <CustomPortableText
//               data={data.intro.rich_intro_description}
//               hasImg={false}
//             />
//           </div>
//         </div>
//       </section>
// 
//       {data.dividers?.img_divider1_dividerImg && (
//         <DivisorImage imageData={data.dividers.img_divider1_dividerImg} />
//       )}
// 
//       <section className="section__amenities">
//         <div className="column__1 fadeInOut">
//           <CustomPortableText
//             data={data.amenities.rich_amenities_title}
//             hasImg={false}
//           />
//         </div>
//         <div className="column__1">
//           <ul className="listado fadeCards">
//             {data.amenities.arr_ref_amenities_amenityList.map((amenity, idx) => (
//               <li key={idx} className="card amenity">
//                 <Icon data={amenity as any} iconPackage={amenity.iconSet as any} />
//                 <span>{amenity.name}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </section>
// 
//       {data.dividers?.img_divider2_dividerImg && (
//         <DivisorImage imageData={data.dividers.img_divider2_dividerImg} />
//       )}
// 
// 
//       
//       <SliderProductModel
//         title={data.models.rich_models_title}
//         models={data.models.arr_models_list}
//       />
// 
// 
// 
//       {data.dividers?.img_divider3_dividerImg && (
//         <DivisorImage imageData={data.dividers.img_divider3_dividerImg} />
//       )}
// 
//       <EmbedVideo videoData={data.video} aspectRatio="16 / 9" />
// 
//       <section className="section__gallery" id="Gallery">
//         {data.gallery.rich_gallery_title && (
//           <div className="column__1 fadeInOut">
//             <CustomPortableText
//               hasImg={false}
//               data={data.gallery.rich_gallery_title}
//             />
//           </div>
//         )}
//         <Gallery images={data.gallery.list_gallery} />
//       </section>
// 
// 
//       <PrevNextSection
//         prevItem={prevProduct}
//         nextItem={nextProduct}
//         basePath="/productos"
//         prevLabel="Anterior producto"
//         nextLabel="Siguiente producto"
//         getters={{
//           getSlug: (p) => p.general.slug.current,
//           getTitle: (p) => p.general.string_general_title,
//           getImage: (p) => p.general.img_general_primaryImg,
//           getCategoryName: (p) => p.general.ref_general_category?.general.string_category_name,
//         }}
//       />
// 
//       <PreFooter />
//     </main>
//   );
// };
// 
// export default page;

export default function page() {
  return null;
}
