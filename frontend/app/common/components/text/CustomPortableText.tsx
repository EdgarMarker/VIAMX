// import { PortableText } from "@portabletext/react";
// import type { IMG as BaseImg, Block } from "@/app/_domain/sanity/types";
// import ResponsiveImage from "@/app/common/components/img/ResponsiveImage";
// 
// interface Props {
//   data: (Block | BaseImg)[];
//   imgContainerClassName?: string;
//   hasImg: boolean;
//   quality?: number;
//   imageVariant?: "hero" | "card" | "thumbnail" | "gallery" | "icon" | "banner";
//   imageClassName?: string;
// }
// 
// const CustomPortableText = ({
//   hasImg = false,
//   data,
//   imgContainerClassName,
//   quality,
//   imageVariant = "card",
//   imageClassName,
// }: Props) => {
//   const components = {
//     types: {
//       image: ({ value }: { value: BaseImg }) => {
//         if (!hasImg) return null;
// 
//         return (
//           <ResponsiveImage
//             imageData={value}
//             variant={imageVariant}
//             className={imageClassName}
//             quality={quality}
//           />
//         );
//       },
//     },
//   };
// 
//   return (
//     <div className={`portableText`}>
//       <PortableText value={data} components={components} />
//     </div>
//   );
// };
// 
// export default CustomPortableText;

export default (() => null) as any;
