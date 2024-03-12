import Image from "next/image";
import React from "react";

import { TImgShow } from "../../../types/img";
import { cn, getRandomElement } from "@/lib/utils";
type Props = {
  url: string;
  prompt: string;
  width?: number;
  height?: number;
};

const sleep = async (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("success"), timeout);
  });
};

const fallBackUrl =
  "https://plus.unsplash.com/premium_photo-1709311451578-5fe37a500fc2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8";

export default async function LogoSticker({
  url = fallBackUrl,
  prompt,
  width = 1200,
  height = 550,
}: Props) {
  await sleep(1500);

  const bgColorArray = [
    "bg-slate-100/50",
    "bg-red-100/50",
    "bg-green-100/50",
    "bg-yellow-100/50",
    "bg-cyan-100/50",
    "bg-blue-100/50",
  ];
  const bgColor = getRandomElement(bgColorArray);

  return (
    <div className={cn("flex flex-col gap-2 rounded p-1", bgColor)}>
      <img
        alt="Next.js logo"
        src={url}
        className="rounded"
        width={width}
        height={height}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
      <p className="self-center font-semibold tracking-tighter">{prompt}</p>
    </div>
  );
}
