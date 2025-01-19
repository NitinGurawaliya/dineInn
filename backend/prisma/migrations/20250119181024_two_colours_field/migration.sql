/*
  Warnings:

  - You are about to drop the column `navbarColor` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `textColor` on the `Menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "navbarColor",
DROP COLUMN "textColor",
ADD COLUMN     "componentColor" TEXT;
