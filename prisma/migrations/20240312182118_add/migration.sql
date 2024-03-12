-- CreateTable
CREATE TABLE "Image" (
    "imgId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "src" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("imgId")
);
