/*
  Warnings:

  - You are about to drop the column `filename` on the `SubCategory` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `SubCategory` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SubCategory` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "SubCategory_filename_key";

-- AlterTable
ALTER TABLE "SubCategory" DROP COLUMN "filename",
DROP COLUMN "image",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "images" (
    "userId" TEXT NOT NULL,
    "filename" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "images_filename_key" ON "images"("filename");
