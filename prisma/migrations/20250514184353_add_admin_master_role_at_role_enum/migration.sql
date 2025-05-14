-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN_MASTER';

-- DropForeignKey
ALTER TABLE "base_products" DROP CONSTRAINT "base_products_typeId_fkey";

-- AddForeignKey
ALTER TABLE "base_products" ADD CONSTRAINT "base_products_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
