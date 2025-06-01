/*
  Warnings:

  - Added the required column `title` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fields" ADD COLUMN     "ready" BOOLEAN;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "responsibleCpf" DROP NOT NULL,
ALTER COLUMN "responsibleName" DROP NOT NULL,
ALTER COLUMN "responsibleEmail" DROP NOT NULL,
ALTER COLUMN "responsiblePhone" DROP NOT NULL,
ALTER COLUMN "counterpartCapitalItem" DROP NOT NULL,
ALTER COLUMN "counterpartCapitalValue" DROP NOT NULL,
ALTER COLUMN "counterpartOperatingCostCode" DROP NOT NULL,
ALTER COLUMN "counterpartOperatingCostValue" DROP NOT NULL,
ALTER COLUMN "totalValue" DROP NOT NULL,
ALTER COLUMN "requestedValue" DROP NOT NULL,
ALTER COLUMN "baseValue" DROP NOT NULL;
