/*
  Warnings:

  - Added the required column `City` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ContactNum` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "City" TEXT NOT NULL,
ADD COLUMN     "ContactNum" BIGINT NOT NULL;

-- CreateTable
CREATE TABLE "UpiQr" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UpiQr_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UpiQr" ADD CONSTRAINT "UpiQr_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
