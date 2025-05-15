-- DropForeignKey
ALTER TABLE "base_products" DROP CONSTRAINT "base_products_typeId_fkey";

-- DropForeignKey
ALTER TABLE "project_partnerships" DROP CONSTRAINT "project_partnerships_municipalityId_fkey";

-- DropForeignKey
ALTER TABLE "qualified_staffs" DROP CONSTRAINT "qualified_staffs_municipalityId_fkey";

-- AddForeignKey
ALTER TABLE "qualified_staffs" ADD CONSTRAINT "qualified_staffs_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_partnerships" ADD CONSTRAINT "project_partnerships_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_products" ADD CONSTRAINT "base_products_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
