/*
  Warnings:

  - Added the required column `subcategory_id` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_id_fkey";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "subcategory_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "SubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
