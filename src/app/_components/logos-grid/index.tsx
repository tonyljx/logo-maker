import React, { Suspense } from "react";
import ImageSkeleton from "../image-skeleton";
import LogoSticker from "../logo-sticker";

type Props = {};
const array = Array.from({ length: 20 }, (_, index) => index);

export default function LogosGrid({}: Props) {
  return (
    <div className="mt-[15rem] md:mt-[18rem]">
      <h2 className="mb-3 text-xl font-semibold">Latest</h2>
      <div className="relative grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {array.map((item) => (
          <Suspense key={item} fallback={<ImageSkeleton />}>
            {/* fallback={<Loader2 className="animate-spin" />} */}
            <LogoSticker />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
