// "use client";
// 
// import "./filter.scss";
// import React, { useMemo, Suspense } from "react";
// import { useSearchParams, useRouter, usePathname } from "next/navigation";
// import CustomPortableText from "../text/CustomPortableText";
// import PostCard from "../card/PostCard";
// import ProductCard from "../card/ProductCard";
// import Product2Card from "../card/Product2Card";
// 
// interface FilterOption {
//   value: string;
//   label: string;
// }
// 
// type FilterVariant = "blog" | "productos" | "productos2";
// 
// interface Props {
//   allItems: any[];
//   filterOptions: FilterOption[];
//   dataTitle?: any;
//   itemsPerPage?: number;
//   variant: FilterVariant;
// }
// 
// const FilterAndPaginationContent = ({
//   allItems,
//   filterOptions,
//   dataTitle,
//   itemsPerPage = 9,
//   variant,
// }: Props) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
// 
//   const selectedCategory = searchParams.get("category") || "all";
//   const page = Number(searchParams.get("page")) || 1;
// 
//   const filteredItems = useMemo(() => {
//     if (selectedCategory === "all") return allItems;
// 
//     return allItems.filter((item) => {
//       const slug = item?.general?.ref_general_category?.general?.slug?.current || "";
//       return slug === selectedCategory;
//     });
//   }, [allItems, selectedCategory]);
// 
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const currentItems = filteredItems.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );
// 
//   const updateUrl = (newParams: Record<string, string>) => {
//     const params = new URLSearchParams(searchParams.toString());
//     Object.entries(newParams).forEach(([key, value]) => {
//       params.set(key, value);
//     });
//     router.push(`${pathname}?${params.toString()}`, { scroll: false });
//   };
// 
//   const handleFilterChange = (value: string) => {
//     updateUrl({ category: value, page: "1" });
//   };
// 
//   const goToPage = (num: number) => {
//     updateUrl({ page: num.toString() });
//   };
// 
//   const goPrev = () => goToPage(Math.max(1, page - 1));
//   const goNext = () => goToPage(Math.min(totalPages, page + 1));
// 
//   const renderItem = (item: any, index: number) => {
//     switch (variant) {
//       case "blog":
//         return <PostCard key={index} data={item} />;
//       case "productos":
//         return <ProductCard key={index} data={item} />;
//       case "productos2":
//         return <Product2Card key={index} data={item} />;  
//       default:
//         return null;
//     }
//   };
// 
//   return (
//     <>
//       <div className="column__2 filter__container">
//         <div className="col__left">
//           {dataTitle && <CustomPortableText hasImg={false} data={dataTitle} />}
//         </div>
//         <div className="col__right">
//           <label htmlFor="filter-select" className="filter-select">
//             Filtrar:{" "}
//             <select
//               id="filter-select"
//               value={selectedCategory}
//               onChange={(e) => handleFilterChange(e.target.value)}
//             >
//               {filterOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </label>
//         </div>
//       </div>
// 
//       <div className="column__1">
//         <div className="listado">
//           {currentItems.length > 0 ? (
//             currentItems.map((item, idx) => renderItem(item, idx))
//           ) : (
//             <p className="no-items">No se encontraron resultados.</p>
//           )}
//         </div>
// 
//         {totalPages > 1 && (
//           <div className="pagination">
//             <button type="button" onClick={goPrev} disabled={page === 1}>
//               ‹
//             </button>
// 
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
//               <button
//                 type="button"
//                 key={num}
//                 onClick={() => goToPage(num)}
//                 className={page === num ? "active" : ""}
//               >
//                 {num}
//               </button>
//             ))}
// 
//             <button
//               type="button"
//               onClick={goNext}
//               disabled={page === totalPages}
//             >
//               ›
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };
// 
// const FilterAndPagination = (props: Props) => (
//   <Suspense fallback={<div>Cargando...</div>}>
//     <FilterAndPaginationContent {...props} />
//   </Suspense>
// );
// 
// export default FilterAndPagination;

export default (() => null) as any;
