// import "./page.scss";
// import Link from "next/link";
// import ProductCard from "@/app/common/components/card/ProductCard";
// import { getProducts } from "@/app/_domain/sanity";
// 
// type PageProps = {
//   params: Promise<{ category: string }>;
// };
// 
// const page = async ({ params }: PageProps) => {
//   const { category } = await params;
// 
//   const products = await getProducts();
//   const data = products.filter(
//     (product) =>
//       product.general.ref_general_category?.general.slug.current === category
//   );
// 
//   return (
//     <main id="ProductCategory">
//       <section className="section__hero">
//         <div className="column__1">
//           <div className="breadcrumbs">
//             <span>
//               <Link href="/productos">Productos</Link>
//               {" / "}
//               <span className="is-disabled" aria-current="page">
//                 {category}
//               </span>
//               {" / "}
//             </span>
//           </div>
// 
//           <h1>
//             Productos en la categoría: <strong>{category}</strong>
//           </h1>
//         </div>
//       </section>
// 
//       <section className="section__products">
//         <div className="column__1">
//           <div className="listado">
//             {data.length > 0 ? (
//               data.map((product, idx) => (
//                 <ProductCard key={idx} data={product} />
//               ))
//             ) : (
//               <p>No hay productos en esta categoría.</p>
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
