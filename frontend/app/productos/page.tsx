// import "./page.scss";
// 
// import PreFooter from "../common/components/footer/PreFooter";
// import FilterAndPagination from "../common/components/filter/FilterAndPagination";
// 
// 
// import { getPageMetadata } from "../common/utils/helper-seo";
// import { getCatalogPage, getCatalogProductSEO, getProductCategories, getProducts } from "../_domain/sanity";
// import Hero from "../common/components/hero/Hero";
// 
// export async function generateMetadata() {
//   return getPageMetadata(getCatalogProductSEO);
// }
// 
// const page = async () => {
//   const data = await getCatalogPage();
//   const products = await getProducts();
//   const productCategories = await getProductCategories();
// 
//   const filterOptions = [
//     { value: "all", label: "Todas las categorías" },
//     ...productCategories.map((cat) => ({
//       value: cat.general.slug.current,
//       label: cat.general.string_category_name,
//     })).filter((option) => option.value.trim() !== "" && option.label.trim() !== ""),
//   ];
// 
//   return (
//     <main id="Products">
//       <Hero variant="catalog-productos" data={data} />
// 
//       <section id="section__products" className="section__products">
//         <FilterAndPagination
//           allItems={products}
//           filterOptions={filterOptions}
//           itemsPerPage={18}
//           dataTitle={data.producto.rich_producto_title}
//           variant="productos"
//         />
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
