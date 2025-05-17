/*
  Warnings:

  - Added the required column `companyId` to the `specific_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "specific_products" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "specific_products" ADD CONSTRAINT "specific_products_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
