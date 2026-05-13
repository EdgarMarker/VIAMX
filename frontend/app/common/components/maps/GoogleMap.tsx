// "use client";
// 
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import Script from "next/script";
// 
// type Props = {
//   apiKey: string;
//   lat: number;
//   lng: number;
//   zoom?: number;
//   height?: number;
//   className?: string;
//   styles?: google.maps.MapTypeStyle[];
//   mapId?: string;
//   markerSvgUrl?: string;
// };
// 
// declare global {
//   interface Window {
//     google?: typeof google;
//   }
// }
// 
// export default function GoogleMap({
//   apiKey,
//   lat,
//   lng,
//   zoom = 15,
//   height = 400,
//   className,
//   styles,
//   mapId,
//   markerSvgUrl = "/svg/pin.svg",
// }: Props) {
//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const [ready, setReady] = useState(false);
//   const [scriptError, setScriptError] = useState<string | null>(null);
// 
//   // ✅ si ya existe (nav SPA), listo
//   useEffect(() => {
//     if (window.google?.maps?.Map) setReady(true);
//   }, []);
// 
//   const src = useMemo(() => {
//     const params = new URLSearchParams({
//       key: apiKey,
//       v: "weekly",
//       loading: "async",
//       ...(mapId ? { libraries: "marker" } : {}),
//     });
//     return `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
//   }, [apiKey, mapId]);
// 
//   // ✅ Cuando Script dice "ready", a veces google.maps aún no está completo.
//   // Hacemos polling corto.
//   const markReadyWhenAvailable = () => {
//     if (window.google?.maps?.Map) {
//       setReady(true);
//       return;
//     }
//     let tries = 0;
//     const t = window.setInterval(() => {
//       tries += 1;
//       if (window.google?.maps?.Map) {
//         window.clearInterval(t);
//         setReady(true);
//       } else if (tries >= 40) {
//         // 40 * 50ms = 2s
//         window.clearInterval(t);
//       }
//     }, 50);
//   };
// 
//   useEffect(() => {
//     if (!ready) return;
//     if (!mapRef.current) return;
// 
//     // ✅ si hubo error de script, no intentes inicializar
//     if (scriptError) return;
// 
//     if (!window.google?.maps?.Map) {
//       markReadyWhenAvailable();
//       return;
//     }
// 
//     let map: google.maps.Map | null = null;
//     let marker: any = null;
// 
//     (async () => {
// 
//       const center = { lat, lng };
// 
//       // ✅ fallback seguro
//       const ControlPosition = google.maps.ControlPosition;
//       const zoomPos =
//         ControlPosition?.RIGHT_BOTTOM ??
//         ControlPosition?.RIGHT_CENTER ??
//         11;
// 
//       map = new google.maps.Map(mapRef.current!, {
//         center,
//         zoom,
//         ...(mapId ? { mapId } : { styles }),
//         mapTypeControl: false,
//         streetViewControl: false,
//         fullscreenControl: false,
//         zoomControl: true,
//         zoomControlOptions: { position: zoomPos },
//       });
// 
//       if (mapId) {
//         // @ts-ignore
//         const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
// 
//         const img = document.createElement("img");
//         img.src = markerSvgUrl;
//         img.alt = "Ubicación";
//         img.style.width = "70px";
//         img.style.height = "70px";
// 
//         marker = new AdvancedMarkerElement({
//           map,
//           position: center,
//           content: img,
//         });
//       } else {
//         marker = new google.maps.Marker({
//           map,
//           position: center,
//           icon: {
//             url: markerSvgUrl,
//             scaledSize: new google.maps.Size(70, 70),
//           },
//         });
//       }
//     })();
// 
//     return () => {
//       try {
//         if (marker && typeof marker.setMap === "function") marker.setMap(null);
//       } catch {}
//       map = null;
//     };
//   }, [ready, scriptError, lat, lng, zoom, styles, mapId, markerSvgUrl]);
// 
// 
//   return (
//     <>
//       <Script
//         id="google-maps-js"
//         src={src}
//         strategy="afterInteractive"
//         onReady={() => {
//           markReadyWhenAvailable();
//         }}
//         onError={(e) => {
//           setScriptError("Script failed to load");
//         }}
//       />
// 
//       {scriptError ? (
//         <div style={{ width: "100%", height, display: "grid", placeItems: "center" }}>
//           <p>No se pudo cargar Google Maps.</p>
//         </div>
//       ) : (
//         <div ref={mapRef} className={className} style={{ width: "100%", height }} />
//       )}
//     </>
//   );
// }

export default (() => null) as any;
