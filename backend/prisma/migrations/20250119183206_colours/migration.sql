/*
  Warnings:

  - You are about to drop the column `bgColor` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `componentColor` on the `Menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "bgColor",
DROP COLUMN "componentColor";

-- AlterTable
ALTER TABLE "RestaurantDetails" ADD COLUMN     "bgColor" TEXT,
ADD COLUMN     "componentColor" TEXT;
