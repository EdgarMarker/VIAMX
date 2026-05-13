// "use client";
// 
// import React, { useEffect, useMemo, useState } from "react";
// import { usePathname } from "next/navigation";
// import Svg from "../img/Svg";
// import "./ShareBar.scss";
// 
// type Props = {
//   title: string;
//   text?: string;
//   className?: string;
// };
// 
// export default function ShareBar({ title, text = "", className = "" }: Props) {
//   const pathname = usePathname();
// 
//   const [copied, setCopied] = useState(false);
//   const [url, setUrl] = useState("");                 // ✅ se setea en client
//   const [canNativeShare, setCanNativeShare] = useState(false); // ✅ se setea en client
// 
//   // ✅ Esto corre solo en cliente (después de hidratar)
//   useEffect(() => {
//     const nextUrl = `${window.location.origin}${pathname}`;
//     setUrl(nextUrl);
//     setCanNativeShare(typeof navigator !== "undefined" && "share" in navigator);
//   }, [pathname]);
// 
//   const encodedUrl = useMemo(() => encodeURIComponent(url), [url]);
//   const encodedTitle = useMemo(() => encodeURIComponent(title), [title]);
//   const encodedText = useMemo(() => encodeURIComponent(text), [text]);
// 
//   const links = useMemo(
//     () => ({
//       whatsapp: `https://wa.me/?text=${encodedTitle}%0A${encodedUrl}`,
//       x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
//       linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
//       email: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
//     }),
//     [encodedTitle, encodedUrl, encodedText]
//   );
// 
//   const onCopy = async () => {
//     if (!url) return;
//     try {
//       await navigator.clipboard.writeText(url);
//       setCopied(true);
//       window.setTimeout(() => setCopied(false), 1200);
//     } catch {
//       const input = document.createElement("input");
//       input.value = url;
//       document.body.appendChild(input);
//       input.select();
//       document.execCommand("copy");
//       document.body.removeChild(input);
//       setCopied(true);
//       window.setTimeout(() => setCopied(false), 1200);
//     }
//   };
// 
//   const onNativeShare = async () => {
//     if (!url) return;
//     if (!("share" in navigator)) return;
//     try {
//       await navigator.share({ title, text, url });
//     } catch {
//       // cancelado
//     }
//   };
// 
//   return (
//     <div className={`shareBar ${className}`.trim()}>
//       <div className="shareBar__actions">
//         <a className="social" href={links.whatsapp} target="_blank" rel="noopener noreferrer">
//           WhatsApp <Svg variant="WhatsApp" />
//         </a>
// 
//         <a className="social" href={links.facebook} target="_blank" rel="noopener noreferrer">
//           Facebook <Svg variant="Facebook" />
//         </a>
// 
//         <a className="social" href={links.linkedin} target="_blank" rel="noopener noreferrer">
//           LinkedIn <Svg variant="LinkedIn" />
//         </a>
// 
//         <a className="social" href={links.x} target="_blank" rel="noopener noreferrer">
//           X <Svg variant="X" />
//         </a>
// 
//         <a className="social" href={links.email}>
//           Email <Svg variant="Email" />
//         </a>
// 
//         {/* ✅ Ahora no hay mismatch: en SSR siempre es null, en client se decide después del mount */}
//         {canNativeShare ? (
//           <button type="button" className="social" onClick={onNativeShare}>
//             Compartir <Svg variant="Share" />
//           </button>
//         ) : null}
// 
//         <button type="button" className="social" onClick={onCopy} aria-live="polite">
//           {copied ? "Copiado" : "Copiar link"} <Svg variant="CopyLink" />
//         </button>
//       </div>
//     </div>
//   );
// }

export default (() => null) as any;
