// "use client";
// 
// import React, { useCallback, useMemo, useState } from "react";
// import ResponsiveImage from "@/app/common/components/img/ResponsiveImage";
// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";
// import "./gallery.scss";
// import type { IMG } from "@/app/_domain/sanity/types.d";
// 
// interface GalleryProps {
//     images: IMG[];
// }
// 
// const Gallery = ({ images }: GalleryProps) => {
//     const [open, setOpen] = useState(false);
//     const [index, setIndex] = useState(0);
// 
//     const slides = useMemo(
//         () =>
//             images.map((img) => ({
//                 src: img.media.url,
//                 alt: img.alt?.altText || "",
//             })),
//         [images]
//     );
// 
//     const handleOpen = useCallback((idx: number) => {
//         setIndex(idx);
//         setOpen(true);
//     }, []);
// 
//     const handleClose = useCallback(() => setOpen(false), []);
// 
//     const handleView = useCallback(({ index }: { index: number }) => {
//         setIndex(index);
//     }, []);
// 
//     if (!images || images.length === 0) return null;
// 
//     return (
//         <>
//             <ul className="listado x5 fadeCards">
//                 {images.map((img, idx) => (
//                     <li className="card card__gallery" key={idx}>
//                         <button
//                             className="gallery-btn"
//                             onClick={() => handleOpen(idx)}
//                             aria-label={`Ver imagen ${idx + 1}`}
//                             type="button"
//                         >
//                             <ResponsiveImage imageData={img} variant="card" />
//                         </button>
//                     </li>
//                 ))}
//             </ul>
// 
//             {
//                 open && (
//                     <Lightbox
//                         open={open}
//                         close={handleClose}
//                         slides={slides}
//                         index={index}
//                         on={{ view: handleView }}
//                     />
//                 )
//             }
//         </>
// 
//     );
// };
// 
// export default Gallery;

export default (() => null) as any;
