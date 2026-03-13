/*
  Warnings:

  - Added the required column `expense_id` to the `ExpenseResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expense_id` to the `Notes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExpenseResult" DROP CONSTRAINT "ExpenseResult_id_fkey";

-- DropForeignKey
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_id_fkey";

-- AlterTable
ALTER TABLE "ExpenseResult" ADD COLUMN     "expense_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "expense_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ExpenseResult" ADD CONSTRAINT "ExpenseResult_expense_id_fkey" FOREIGN KEY ("expense_id") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseResult" ADD CONSTRAINT "ExpenseResult_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_expense_id_fkey" FOREIGN KEY ("expense_id") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
