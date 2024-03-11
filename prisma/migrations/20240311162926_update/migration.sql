/*
  Warnings:

  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - The required column `orderId` was added to the `Order` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userEmail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `isPaid` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "id",
DROP COLUMN "userId",
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL,
DROP COLUMN "isPaid",
ADD COLUMN     "isPaid" INTEGER NOT NULL,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId");
