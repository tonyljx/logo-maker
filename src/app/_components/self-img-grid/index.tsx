"use client";
import React, { Suspense, useContext } from "react";
import ImageSkeleton from "../image-skeleton";
import LogoSticker from "../logo-sticker";

import { AppContext } from "@/contexts/AppContext";

export default function CreatedImgGrid() {
  const { images } = useContext(AppContext);

  if (!images || images.length === 0 || Object.keys(images).length === 0) {
    return null;
  }
  // console.log("img: " + JSON.stringify(images));

  return (
    <div className="mt-[5rem] md:mt-[8rem]">
      <h2 className="mb-3 text-xl font-semibold">Recent</h2>
      <div className="relative grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((item) => (
          <Suspense key={item.src} fallback={<ImageSkeleton />}>
            <LogoSticker
              url={item.src}
              prompt={item.prompt}
              width={300}
              height={300}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
