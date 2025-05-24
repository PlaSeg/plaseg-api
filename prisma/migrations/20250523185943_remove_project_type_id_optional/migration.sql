/*
  Warnings:

  - Made the column `projectTypeId` on table `fields` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "fields" DROP CONSTRAINT "fields_projectTypeId_fkey";

-- AlterTable
ALTER TABLE "fields" ALTER COLUMN "projectTypeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "fields" ADD CONSTRAINT "fields_projectTypeId_fkey" FOREIGN KEY ("projectTypeId") REFERENCES "project_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
