import Image from "next/image";
import React from "react";

type Props = {};

const sleep = async (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("success"), timeout);
  });
};

export default async function LogoSticker({}: Props) {
  await sleep(2000);
  return (
    <Image
      alt="Next.js logo"
      src="https://plus.unsplash.com/premium_photo-1709311451578-5fe37a500fc2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
      className="rounded"
      width={1200}
      height={550}
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    />
  );
}
