import React, { Suspense } from "react";
import ImageSkeleton from "../image-skeleton";
import LogoSticker from "../logo-sticker";

import data from "../../../../public/sticker.json";
import { TImgShow } from "../../../../types/img";

type Props = {};

export default function LogosGrid({}: Props) {
  const dataList: TImgShow[] = data;
  return (
    <div className="mt-[5rem] md:mt-[8rem]">
      <h2 className="mb-3 text-xl font-semibold">Latest</h2>
      <div className="relative grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {dataList.map((item) => (
          <Suspense key={item.imgSrc} fallback={<ImageSkeleton />}>
            {/* fallback={<Loader2 className="animate-spin" />} */}
            <LogoSticker url={item.imgSrc} prompt={item.prompt} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
