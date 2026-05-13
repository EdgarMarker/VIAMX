// "use client";
// 
// import React from "react";
// import { useLenis } from "../../lib/lenis/LenisProvider";
// 
// type Props = {
//   to: string; // "#section__rProducts"
//   children: React.ReactNode;
//   className?: string;
//   offset?: number;
// };
// 
// export default function ScrollToButton({ to, children, className, offset = 0 }: Props) {
//   const lenis = useLenis();
// 
//   return (
//     <button
//       type="button"
//       className={className}
//       onClick={() => {
//         const el = document.querySelector<HTMLElement>(to);
//         if (!el) return;
// 
//         // Desktop (Lenis activo)
//         if (lenis) {
//           lenis.scrollTo(el, { offset });
//           return;
//         }
// 
//         // Mobile (Lenis desactivado): scroll nativo con offset
//         const y = window.scrollY + el.getBoundingClientRect().top - offset;
//         window.scrollTo({ top: y, behavior: "smooth" });
//       }}
//     >
//       {children}
//     </button>
//   );
// }

export default (() => null) as any;
