/*
  Warnings:

  - You are about to drop the `MandatoryDocument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OpportunityMandatoryDocument` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OpportunityMandatoryDocument" DROP CONSTRAINT "OpportunityMandatoryDocument_mandatoryDocumentId_fkey";

-- DropForeignKey
ALTER TABLE "OpportunityMandatoryDocument" DROP CONSTRAINT "OpportunityMandatoryDocument_opportunityId_fkey";

-- DropTable
DROP TABLE "MandatoryDocument";

-- DropTable
DROP TABLE "OpportunityMandatoryDocument";

-- CreateTable
CREATE TABLE "RequiredDocument" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "opportunityId" TEXT NOT NULL,

    CONSTRAINT "RequiredDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RequiredDocument_name_key" ON "RequiredDocument"("name");

-- AddForeignKey
ALTER TABLE "RequiredDocument" ADD CONSTRAINT "RequiredDocument_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
