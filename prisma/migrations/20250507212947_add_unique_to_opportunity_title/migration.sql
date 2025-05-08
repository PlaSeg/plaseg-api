/*
  Warnings:

  - You are about to drop the column `opportunityId` on the `MandatoryDocument` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Opportunity` will be added. If there are existing duplicate values, this will fail.
  - Made the column `createdAt` on table `MandatoryDocument` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
CREATE SEQUENCE mandatorydocument_code_seq;
ALTER TABLE "MandatoryDocument" DROP COLUMN "opportunityId",
ALTER COLUMN "code" SET DEFAULT nextval('mandatorydocument_code_seq'),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL;
ALTER SEQUENCE mandatorydocument_code_seq OWNED BY "MandatoryDocument"."code";

-- AlterTable
ALTER TABLE "OpportunityMandatoryDocument" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Opportunity_title_key" ON "Opportunity"("title");
