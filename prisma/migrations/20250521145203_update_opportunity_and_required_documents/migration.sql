-- DropIndex
DROP INDEX "required_documents_name_key";

-- AlterTable
ALTER TABLE "opportunities" ADD COLUMN     "releasedForAll" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "counterpartPercentage" DROP NOT NULL;
