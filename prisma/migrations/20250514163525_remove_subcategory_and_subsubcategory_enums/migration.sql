/*
  Warnings:

  - The values [SUBCATEGORY,SUBSUBCATEGORY] on the enum `TypeGroup` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeGroup_new" AS ENUM ('SERVICE', 'OPPORTUNITY', 'CATEGORY');
ALTER TABLE "types" ALTER COLUMN "group" TYPE "TypeGroup_new" USING ("group"::text::"TypeGroup_new");
ALTER TYPE "TypeGroup" RENAME TO "TypeGroup_old";
ALTER TYPE "TypeGroup_new" RENAME TO "TypeGroup";
DROP TYPE "TypeGroup_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "base_products" DROP CONSTRAINT "base_products_typeId_fkey";

-- AddForeignKey
ALTER TABLE "base_products" ADD CONSTRAINT "base_products_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
