// "use client";
// import "./horizontal-scroll.scss";
// import React, { useRef } from "react";
// import jsonData from "./pin-scroll.data.json";
// import { useAnimateHorizontalScroll } from "./pin-scroll.animate";
// import { AboutPageInterface } from "@/app/_domain/sanity";
// import CustomPortableText from "../text/CustomPortableText";
// import ResponsiveImage from "../../components/img/ResponsiveImage";
// 
// type HorizontalScrollProps =
//   | {
//     variant?: "default";
//   }
//   | {
//     variant: "about";
//     data: AboutPageInterface;
//   };
// 
// const HorizontalScroll = (props: HorizontalScrollProps) => {
//   const wrapperRef = useRef<HTMLElement>(null);
//   const racerRef = useRef<HTMLUListElement>(null);
// 
//   const { variant = "default" } = props;
// 
//   useAnimateHorizontalScroll(
//     wrapperRef as React.RefObject<HTMLElement>,
//     racerRef as React.RefObject<HTMLUListElement>
//   );
// 
//   switch (variant) {
//     case "about": {
//       const { data } = props as { data: AboutPageInterface };
//       return (
//         <section className="section__horizontalScroll" ref={wrapperRef}>
//           <div className="column__1">
//             <ul ref={racerRef}>
//               <li className="item first__item">
//                 <div className="content">
//                   <div className="portableText">
//                     <CustomPortableText hasImg={false} data={data.values.rich_values_sectionTitle} />
//                   </div>
//                 </div>
//               </li>
// 
//               {data.values.arr_values_valuesList.map((item, index) => (
//                 <li key={index} className="item scroll__item">
//                   <div className="card hcard">
//                     <h3>{item.string_values_valueTitle}</h3>
//                     <p>{item.textarea_values_valueDescription}</p>
//                     <ResponsiveImage imageData={item.icon_values_valueIcon} />
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </section>
//       );
//     }
// 
//     default:
//       return (
//         <section className="section__horizontalScroll" ref={wrapperRef}>
//           <div className="column__1">
//             <ul ref={racerRef}>
//               <li className="item first__item">
//                 <div className="content">
//                   <div className="portableText">
//                     <h2>{jsonData.data.title.h2}</h2>
//                     <p>{jsonData.data.title.p}</p>
//                   </div>
//                 </div>
//               </li>
// 
//               {jsonData.data.items.map((item, index) => (
//                 <li key={index} className="item scroll__item">
//                   <div className="card hcard">
//                     <h3>{item.title}</h3>
//                     <p>{item.description}</p>
//                     <img src={item.img} alt={item.title} />
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </section>
//       );
//   }
// };
// 
// export default HorizontalScroll;

export default (() => null) as any;
