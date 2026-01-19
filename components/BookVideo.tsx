// components/BookVideo.tsx
"use client";

import React from "react";
import config from "@/lib/config";

type BookVideoProps = {
  src: string; // can be full URL OR "/books/trailers/xxx.mp4"
};

function withOrigTrue(url: string) {
  if (!url) return url;
  return url.includes("?") ? url : `${url}?tr=orig-true`;
}

export default function BookVideo({ src }: BookVideoProps) {
  const urlEndpoint = config.env.imageKit.urlEndpoint;

  // If db stored only a file path, convert to full URL
  const fullUrl = src.startsWith("http") ? src : `${urlEndpoint}${src}`;

  const finalUrl = withOrigTrue(fullUrl);

  return (
    <video
      src={finalUrl}
      controls
      preload="metadata"
      className="w-full rounded-xl"
    />
  );
}
