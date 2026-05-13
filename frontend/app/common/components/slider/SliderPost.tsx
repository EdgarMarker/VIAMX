// "use client";
// import React, { useRef } from "react";
// // @ts-expect-error no types
// import { Splide, SplideSlide } from "@splidejs/react-splide";
// import "@splidejs/react-splide/css";
// import { HomePageInterface } from "@/app/_domain/sanity/homePage.contract";
// import CustomPortableText from "../text/CustomPortableText";
// import Svg from "../img/Svg";
// import PostCard from "../card/PostCard";
// 
// type Props = {
//   variant: "Home";
//   data: HomePageInterface;
// };
// 
// const SliderPost = ({ variant, data }: Props) => {
//   const mainSliderRef = useRef<any>(null);
//   const splideOptions: any = {
//     perPage: 3,
//     perMove: 1,
//     arrows: false,
//     pagination: false,
//     drag: true,
//     autoplay: false,
//     gap: "var(--gap)",
//     padding: "5%",
//     breakpoints: {
//       1024: {
//         perPage: 2,
//       },
//       768: {
//         perPage: 1,
//       },
//     },
//   };
// 
//   const handlePrev = () => {
//     if (mainSliderRef.current) {
//       mainSliderRef.current.splide.go("<");
//     }
//   };
// 
//   const handleNext = () => {
//     if (mainSliderRef.current) {
//       mainSliderRef.current.splide.go(">");
//     }
//   };
//   switch (variant) {
//     case "Home":
//       return (
//         <section className="section__rPosts fadeCards">
//           <div className="column__2 ">
//             <div className="col__left">
//               <CustomPortableText
//                 hasImg={false}
//                 data={
//                   data.recentPosts.rich_recentPosts_sectionTitle
//                 }
//               />
//             </div>
//             <div className="col__right">
//               <div className="panel__slide">
//                 <button
//                   type="button"
//                   className="slide__prev"
//                   onClick={handlePrev}
//                 >
//                   <Svg variant="Arrow" />
//                 </button>
//                 <button
//                   type="button"
//                   className="slide__next"
//                   onClick={handleNext}
//                 >
//                   <Svg variant="Arrow" />
//                 </button>
//               </div>
//             </div>
//           </div>
// 
//           <div className="column__1">
//             <Splide ref={mainSliderRef} options={splideOptions}>
//               {data.recentPosts.arr_ref_recentPosts_posts.map((post, idx) => (
//                 <SplideSlide key={idx ?? ""}>
//                   <PostCard data={post} />
//                 </SplideSlide>
//               ))}
//             </Splide>
//           </div>
//         </section>
//       );
//   }
// };
// 
// export default SliderPost;

export default (() => null) as any;
