// import Image from "next/image";
// import type { IMG as ImageType } from "@/app/_domain/sanity/types";
// 
// interface ResponsiveImageProps {
//   imageData: ImageType;
//   width?: number;
//   height?: number;
//   quality?: number;
//   sizes?: string;
//   priority?: boolean;
//   dataSpeed?: string;
//   className?: string;
//   variant?: "hero" | "card" | "thumbnail" | "gallery" | "icon" | "banner";
//   fit?: "crop" | "max" | "clip";
// }
// 
// function sanityTransform(
//   url: string,
//   opts: { w?: number; h?: number; q?: number; fit?: string } = {}
// ) {
//   if (!url?.includes("cdn.sanity.io/images/")) return url;
//   const u = new URL(url);
//   if (opts.w) u.searchParams.set("w", String(opts.w));
//   if (opts.h) u.searchParams.set("h", String(opts.h));
//   if (opts.q) u.searchParams.set("q", String(opts.q));
//   u.searchParams.set("auto", "format");
//   u.searchParams.set("fit", opts.fit || "crop");
//   return u.toString();
// }
// 
// const VARIANT_CONFIG = {
//   hero: {
//     sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw",
//     dimensions: { width: 1920, height: 1080 },
//     quality: 90,
//     priority: true,
//     fit: "max",
//   },
//   banner: {
//     sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw",
//     dimensions: { width: 1440, height: 810 },
//     quality: 85,
//     priority: false,
//     fit: "crop",
//   },
//   card: {
//     sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
//     dimensions: { width: 600, height: 400 },
//     quality: 80,
//     priority: false,
//     fit: "crop",
//   },
//   gallery: {
//     sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw",
//     dimensions: { width: 1000, height: 667 },
//     quality: 85,
//     priority: false,
//     fit: "max",
//   },
//   thumbnail: {
//     sizes: "(max-width: 768px) 150px, 200px",
//     dimensions: { width: 200, height: 200 },
//     quality: 75,
//     priority: false,
//     fit: "crop",
//   },
//   icon: {
//     sizes: "64px",
//     dimensions: { width: 64, height: 64 },
//     quality: 90,
//     priority: false,
//     fit: "crop",
//   },
// } as const;
// 
// type VariantKey = keyof typeof VARIANT_CONFIG;
// 
// export default function ResponsiveImage({
//   imageData,
//   width,
//   height,
//   quality,
//   sizes,
//   priority,
//   dataSpeed,
//   className,
//   variant,
//   fit,
// }: ResponsiveImageProps) {
//   const fallbackVariant: VariantKey = "gallery"; // ✅ mejor que "card"
//   const safeVariant = (variant && variant in VARIANT_CONFIG
//     ? variant
//     : fallbackVariant) as VariantKey;
// 
//   const config = VARIANT_CONFIG[safeVariant];
// 
//   if (process.env.NODE_ENV !== "production" && safeVariant !== variant) {
//     console.warn("[ResponsiveImage] variant inválido o faltante:", variant, "→ usando:", safeVariant);
//   }
// 
//   const rawSrc = imageData?.media?.url;
//   if (!rawSrc) return null;
// 
//   const finalWidth = width ?? config.dimensions.width;
//   const finalHeight = height ?? config.dimensions.height;
//   const finalSizes = sizes ?? config.sizes;
//   const finalPriority = priority ?? config.priority;
//   const finalQuality = quality ?? config.quality;
// 
//   const imageSrc = sanityTransform(rawSrc, {
//     w: finalWidth,
//     h: finalHeight,
//     q: finalQuality,
//     fit: fit ?? config.fit,
//   });
// 
//   return (
//     <Image
//       src={imageSrc}
//       alt={imageData?.alt?.altText ?? ""}
//       width={finalWidth}
//       height={finalHeight}
//       sizes={finalSizes}
//       priority={finalPriority}
//       className={className}
//       data-speed={dataSpeed}
//     />
//   );
// }

export default (() => null) as any;
