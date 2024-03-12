/*
  Warnings:

  - Made the column `userEmail` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "userEmail" SET NOT NULL;
