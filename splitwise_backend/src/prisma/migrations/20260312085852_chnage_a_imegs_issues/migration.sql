/*
  Warnings:

  - A unique constraint covering the columns `[filename]` on the table `SubCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `filename` to the `SubCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_filename_key" ON "SubCategory"("filename");
