// import React from "react";
// import Link from "next/link";
// import "./page.scss";
// 
// import PreFooter from "@/app/common/components/footer/PreFooter";
// import ResponsiveImage from "@/app/common/components/img/ResponsiveImage";
// import CustomPortableText from "@/app/common/components/text/CustomPortableText";
// import ShareBar from "@/app/common/components/share/ShareBar";
// import PostCard from "@/app/common/components/card/PostCard";
// import Svg from "@/app/common/components/img/Svg";
// 
// import { getPageMetadata } from "@/app/common/utils/helper-seo";
// import Hero from "@/app/common/components/hero/Hero";
// import { getPostBySlug, getPostCategories, getPosts } from "@/app/_domain/sanity";
// 
// type PageProps = {
//   params: Promise<{ slug: string }>;
// };
// 
// export async function generateMetadata({ params }: PageProps) {
//   const { slug } = await params;
//   return getPageMetadata(() => getPostBySlug(slug));
// }
// 
// const page = async ({ params }: PageProps) => {
//   const { slug } = await params;
// 
//   const data = await getPostBySlug(slug);
//   if (!data) return null;
// 
//   const categories = await getPostCategories();
//   const allPosts = await getPosts();
// 
//   const sortedPosts = allPosts
//     .filter((p) => p.general?.slug?.current?.trim())
//     .sort(
//       (a, b) =>
//         new Date(b.general.date).getTime() - new Date(a.general.date).getTime()
//     );
// 
//   const otherPosts = sortedPosts.filter((p) => p.general.slug.current !== slug);
// 
//   const recentPostsPanel = otherPosts.slice(0, 5);
// 
//   const currentCatSlug = data.general.ref_general_category?.general.slug.current;
//   const relatedPosts = otherPosts.filter(
//     (p) =>
//       currentCatSlug &&
//       p.general.ref_general_category?.general.slug.current === currentCatSlug
//   );
// 
//   const relatedSlugs = new Set(relatedPosts.map((p) => p.general.slug.current));
//   const filledRelatedPosts = [
//     ...relatedPosts,
//     ...otherPosts.filter((p) => !relatedSlugs.has(p.general.slug.current)),
//   ].slice(0, 4);
// 
//   const curIdx = sortedPosts.findIndex((p) => p.general.slug.current === slug);
//   const prevPost = sortedPosts[curIdx - 1];
//   const nextPost = sortedPosts[curIdx + 1];
// 
//   const authorImg = data.general.ref_general_author?.img_author_picture;
// 
//   return (
//     <main id="Post">
//       <section className="section__content">
//         <div className="column__2">
//           <div className="col__left">
//             <Hero variant="post" data={data} />
// 
//             <article className="article__wrapper">
//               <CustomPortableText
//                 hasImg={true}
//                 data={data.page.rich_page_content || []}
//                 imageVariant="gallery"
//               />
//             </article>
// 
//             <div className="section__author">
//               <div className="sa__left">
//                 {authorImg?.media?.url ? (
//                   <ResponsiveImage imageData={authorImg} variant="thumbnail" />
//                 ) : null}
//               </div>
// 
//               <div className="sa__right">
//                 <h4>Sobre el autor</h4>
//                 <h5>
//                   {data.general.ref_general_author?.string_author_name}
//                   {" | "}
//                   <span>
//                     {data.general.ref_general_author?.string_author_position}
//                   </span>
//                 </h5>
//                 <p>{data.general.ref_general_author?.textarea_author_bio}</p>
//               </div>
//             </div>
// 
//             <div className="blog__footer">
//               <div className="section__prev__next">
//                 <div className="column__2">
//                   <div className="col__left card">
//                     {prevPost ? (
//                       <Link
//                         className="btn__prev__next btn__prev"
//                         href={`/blog/${prevPost.general.slug.current}`}
//                       >
//                         <div className="prevnext__img">
//                           <ResponsiveImage
//                             imageData={prevPost.general.img_general_primaryImg}
//                             variant="card"
//                           />
//                         </div>
//                         <div className="prevnext__data">
//                           <span>
//                             <Svg variant="Arrow" />
//                             Anterior artículo
//                           </span>
//                           <h2>{prevPost.general.string_general_title}</h2>
//                           <h3>
//                             {
//                               prevPost.general.ref_general_category?.general
//                                 .string_category_name
//                             }
//                           </h3>
//                         </div>
//                       </Link>
//                     ) : (
//                       <span />
//                     )}
//                   </div>
// 
//                   <div className="col__right card">
//                     {nextPost ? (
//                       <Link
//                         className="btn__prev__next btn__next"
//                         href={`/blog/${nextPost.general.slug.current}`}
//                       >
//                         <div className="prevnext__img">
//                           <ResponsiveImage
//                             imageData={nextPost.general.img_general_primaryImg}
//                             variant="card"
//                           />
//                         </div>
//                         <div className="prevnext__data">
//                           <span>
//                             Siguiente artículo <Svg variant="Arrow" />
//                           </span>
//                           <h2>{nextPost.general.string_general_title}</h2>
//                           <h3>
//                             {
//                               nextPost.general.ref_general_category?.general
//                                 .string_category_name
//                             }
//                           </h3>
//                         </div>
//                       </Link>
//                     ) : (
//                       <span />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
// 
//           <div className="col__right">
//             <div className="blog__panel panel__share">
//               <h3 className="shareBar__title">Comparte este artículo en</h3>
//               <ShareBar
//                 title={data.general.string_general_title}
//                 text={data.general.textarea_general_cardExcerpt}
//               />
//             </div>
// 
//             <div className="blog__panel panel__recentPost">
//               <h3>Artículos recientes</h3>
//               <ul>
//                 {recentPostsPanel.map((post, idx) => (
//                   <li key={idx}>
//                     <div className="rc__left">
//                       <Link href={`/blog/${post.general.slug.current}`}>
//                         <ResponsiveImage
//                           imageData={post.general.img_general_primaryImg}
//                           variant="card"
//                         />
//                       </Link>
//                     </div>
// 
//                     <div className="rc__right">
//                       <Link href={`/blog/${post.general.slug.current}`}>
//                         <h4>{post.general.string_general_title}</h4>
//                       </Link>
// 
//                       <Link
//                         href={`/blog/categoria/${post.general.ref_general_category?.general.slug.current}`}
//                       >
//                         <h5>
//                           {
//                             post.general.ref_general_category?.general
//                               .string_category_name
//                           }
//                         </h5>
//                       </Link>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
// 
//             <div className="blog__panel panel__categories sticky">
//               <h3>Categorías</h3>
//               <ul>
//                 {categories.map((category, idx) => (
//                   <li key={idx}>
//                     <a href={`/blog/categoria/${category.general.slug.current}`}>
//                       {category.general.string_category_name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
// 
// 
//           </div>
//         </div>
//       </section>
// 
//       <section className="section__related">
//         <div className="column__1 related__panel">
//           <h3>Artículos relacionados</h3>
// 
//           <ul className="related__list listado">
//             {filledRelatedPosts.map((post, index) => (
//               <PostCard key={index} data={post} />
//             ))}
//           </ul>
//         </div>
//       </section>
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
