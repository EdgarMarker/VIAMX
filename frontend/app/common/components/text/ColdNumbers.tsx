// "use client";
// 
// import React from "react";
// import "./ColdNumbers.scss";
// import type { IMG } from "@/app/_domain/sanity/types.d";
// import ResponsiveImage from "../img/ResponsiveImage";
// 
// 
// import { useGsapCore } from "@/app/common/lib/gsap/gsapClient";
// 
// type ColdNumberItem = {
//   id?: string | number;
//   prefix?: string;
//   sufix?: string;
//   number: number;
//   data: string;
//   img?: IMG;
// };
// 
// interface ColdNumbersProps {
//   items?: ColdNumberItem[];
// }
// 
// function clamp(n: number, min: number, max: number) {
//   return Math.max(min, Math.min(max, n));
// }
// 
// export default function ColdNumbers({ items: propItems = [] }: ColdNumbersProps) {
//   const wrapperRef = React.useRef<HTMLUListElement | null>(null);
//   const { gsap, ScrollTrigger } = useGsapCore();
// 
//   const activeItems = propItems ?? [];
//   if (!activeItems.length) return null;
// 
//   // ✅ Config editable
//   const STEP = 1;                 // +1 / +2 / +3...
//   const MIN_DURATION = 0.6;        // segundos
//   const MAX_DURATION = 1.6;        // segundos
// 
//   React.useLayoutEffect(() => {
//     if (!wrapperRef.current || !gsap || !ScrollTrigger) return;
// 
//     const root = wrapperRef.current;
//     const items = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"));
// 
//     if (!items.length) return;
// 
//     const ctx = gsap.context(() => {
//       items.forEach((el) => {
//         const targetStr = el.getAttribute("data-count") ?? "0";
//         const target = Number(targetStr);
// 
//         if (!Number.isFinite(target)) return;
// 
//         const duration = clamp(target / 40, MIN_DURATION, MAX_DURATION);
//         const obj = { value: 0 };
// 
//         const render = () => {
//           const stepped = Math.floor(obj.value / STEP) * STEP;
//           const safe = Math.min(stepped, target);
//           el.textContent = String(safe);
//         };
// 
//         obj.value = 0;
//         render();
// 
//         ScrollTrigger.create({
//           trigger: el,
//           start: "top 85%",
//           once: true,
//           onEnter: () => {
//             gsap.to(obj, {
//               value: target,
//               duration,
//               ease: "power2.out",
//               onUpdate: render,
//               onComplete: () => {
//                 el.textContent = String(target);
//               },
//             });
//           },
//         });
//       });
// 
//       ScrollTrigger.refresh();
//     }, root);
// 
//     return () => ctx.revert();
//   }, [gsap, ScrollTrigger, activeItems]);
// 
//   return (
//     <ul ref={wrapperRef} className="cold__numbers__list listado">
//       {activeItems.map((item, index) => (
//         <li key={item.id ?? index}>
//           <div className="data__wrapper">
//             <div className="data__text__wrapper">
//               <h4>
//                 <span className="prefix">{item.prefix}</span>
//                 <span
//                   className="coldNumber"
//                   data-count={item.number}
//                   aria-label={`${item.number}`}
//                 >
//                   0
//                 </span>
//                 <span className="sufix">{item.sufix}</span>
//               </h4>
//               <div className="data__bar" />
//             </div>
//             <h3>{item.data}</h3>
//             {item.img?.media?.url ? (
//               <div className="data__img__wrapper">
//                 <ResponsiveImage imageData={item.img} variant="icon" />
//               </div>
//             ) : null}
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }

export default (() => null) as any;
