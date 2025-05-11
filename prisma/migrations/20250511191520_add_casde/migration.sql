-- DropForeignKey
ALTER TABLE "opportunities" DROP CONSTRAINT "opportunities_typeId_fkey";

-- DropForeignKey
ALTER TABLE "required_documents" DROP CONSTRAINT "required_documents_opportunityId_fkey";

-- DropForeignKey
ALTER TABLE "types" DROP CONSTRAINT "types_parentId_fkey";

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "required_documents" ADD CONSTRAINT "required_documents_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "types" ADD CONSTRAINT "types_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
