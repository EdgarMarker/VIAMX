// import "./page.scss";
// import Link from "next/link";
// 
// import PostCard from "@/app/common/components/card/PostCard";
// import { getPosts } from "@/app/_domain/sanity";
// 
// 
// type PageProps = {
//   params: Promise<{ category: string }>;
// };
// 
// 
// const page = async ({ params }: PageProps) => {
//   const { category } = await params;
// 
//   const posts = await getPosts();
//   const data = posts.filter(
//     (post) =>
//       post.general.ref_general_category?.general.slug.current === category
//   );
// 
//   return (
//     <main id="BlogCategory">
//       <section className="section__hero">
//         <div className="column__1">
//           <div className="breadcrumbs">
//             <span>
//               <Link href="/blog">Blog</Link>
//               {" / "}
//               <span className="is-disabled" aria-current="page">
//                 {category}
//               </span>
//               {" / "}
//             </span>
//           </div>
// 
//           <h1>
//             Artículos de la categoría:
//             <strong>{category}</strong>
//           </h1>
//         </div>
//       </section>
// 
//       <section className="section__products">
//         <div className="column__1">
//           <div className="listado">
//             {data.length > 0 ? (
//               data.map((product, idx) => (
//                 <PostCard key={idx} data={product} />
//               ))
//             ) : (
//               <p>No hay artículos en esta categoría.</p>
//             )}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };
// 
// export default page;

export default function page() {
  return null;
}
