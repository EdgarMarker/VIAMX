// import React from "react";
// import type { AmenityInterface } from "@/app/_domain/sanity/amenity.contract";
// import type { IconPackage } from "@/app/_domain/sanity/types.d";
// import { lucideMap } from "@/app/common/utils/helper-icon";
// import ResponsiveImage from "../../components/img/ResponsiveImage";
// 
// interface IconProps {
//   data: AmenityInterface;
//   iconPackage: IconPackage;
//   size?: number;
//   strokeWidth?: number;
//   className?: string;
//   color?: string;
// }
// 
// const SanityIcon = ({
//   data,
//   iconPackage,
//   size = 50,
//   strokeWidth = 1,
//   className,
//   color = "var(--color-secondary)",
// }: IconProps) => {
//   const LucideIcon = lucideMap[data.iconName];
// 
//   const iconVariants = {
//     lucide: LucideIcon ? (
//       <LucideIcon
//         color={color}
//         size={size}
//         strokeWidth={strokeWidth}
//         className={className}
//       />
//     ) : null,
//     custom: data?.customIcon && data.customIcon.media?.url
//       ? <ResponsiveImage imageData={data.customIcon} />
//       : null,
//   };
// 
//   return iconVariants[iconPackage];
// };
// 
// export default SanityIcon;

export default (() => null) as any;
