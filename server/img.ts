import { TImgInsert } from "../types/img";
import { prisma } from "./db";

export async function insertImg(img: TImgInsert) {
  return await prisma.image.create({
    data: {
      createdAt: img.createdAt,
      src: img.src,
      userEmail: img.userEmail,
      prompt: img.prompt,
    },
  });
}

export async function fetchImage(userEmail: string) {
  const images = await prisma.image.findMany({
    where: {
      userEmail: {
        equals: userEmail,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return images;
}
