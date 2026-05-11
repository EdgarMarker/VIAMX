"use client";
import "./EmbedVideo.scss";
import React from "react";
import Column1 from "@/app/common/components/layout/Column1";
import type { IMG } from "@/app/_domain/sanity/types";
import DivisorImage from "@/app/common/components/divisor/DivisorImage";

type VideoData = {
  bool_video_hasVideo?: boolean;
  string_video_url?: string;
  img_video_fallbackImg: IMG | null;
};

type Props = {
  videoData?: VideoData | null;

  // layout wrapper
  id?: string;
  sectionClassName?: string;     // clase del section (Column1)
  columnClassName?: string;      // clase del column__1 (Column1)

  // video
  className?: string;
  aspectRatio?: string; // "16 / 9"
  showControls?: boolean; // para iframe, realmente es "controls=1"
};

function getYouTubeId(url: string) {
  if (!url) return "";

  // youtube.com/watch?v=
  if (url.includes("youtube.com/watch?v=")) {
    return url.split("v=")[1]?.split("&")[0] ?? "";
  }

  // youtu.be/
  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1]?.split("?")[0] ?? "";
  }

  // youtube.com/embed/
  if (url.includes("youtube.com/embed/")) {
    return url.split("embed/")[1]?.split("?")[0] ?? "";
  }

  return "";
}

export default function EmbedVideo({
  videoData,
  id,
  sectionClassName = "section__video",
  columnClassName = "",
  className = "",
  aspectRatio = "16 / 9",
  showControls = true,
}: Props) {
  const hasVideo =
    !!videoData?.bool_video_hasVideo && !!videoData?.string_video_url;

    const hasFallback = !!videoData?.img_video_fallbackImg?.media?.url;

    // ✅ si no hay nada real, NO renderiza nada
    if (!hasVideo && !hasFallback) return null;

  // ✅ Si no hay nada, NO renderiza nada
  if (!hasVideo && !hasFallback) return null;

  // ✅ Si no hay video, pero sí fallback, renderiza imagen
  if (!hasVideo && hasFallback) {
    return (
      <DivisorImage
        id={id}
        sectionClassName={sectionClassName}
        imageData={videoData!.img_video_fallbackImg!}
        variant="hero"
        fromScale={1.1}
        toScale={1}
      />
    );
  }

  // ✅ Hay video
  const url = videoData!.string_video_url!;
  const ytId = getYouTubeId(url);
  const isYoutube = !!ytId;

  // OJO: YouTube con controles=1 funciona, pero "controles propios" 100% custom
  // NO es posible sin usar la IFrame Player API (más abajo te lo explico).
  const embedUrl = isYoutube
    ? `https://www.youtube.com/embed/${ytId}?autoplay=0&mute=0&loop=0&controls=${
        showControls ? 1 : 0
      }&rel=0&modestbranding=1`
    : url;

  return (
    <Column1
      id={id}
      sectionClassName={"section__embed__video"}
    >
      <div
        className={className}
        style={{
          width: "100%",
          aspectRatio,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {isYoutube ? (
          <iframe
            src={embedUrl}
            title="Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        ) : (
          <video
            src={url}
            controls
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}
      </div>
    </Column1>
  );
}