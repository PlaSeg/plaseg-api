/*
  Warnings:

  - Made the column `typeId` on table `base_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `typeId` on table `opportunities` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "base_products" DROP CONSTRAINT "base_products_typeId_fkey";

-- DropForeignKey
ALTER TABLE "opportunities" DROP CONSTRAINT "opportunities_typeId_fkey";

-- AlterTable
ALTER TABLE "base_products" ALTER COLUMN "typeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "opportunities" ALTER COLUMN "typeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_products" ADD CONSTRAINT "base_products_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
