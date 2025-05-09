/*
  Warnings:

  - You are about to drop the `Opportunity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RequiredDocument` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RequiredDocument" DROP CONSTRAINT "RequiredDocument_opportunityId_fkey";

-- DropTable
DROP TABLE "Opportunity";

-- DropTable
DROP TABLE "RequiredDocument";

-- CreateTable
CREATE TABLE "opportunities" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "availableValue" DECIMAL(65,30) NOT NULL,
    "minValue" DECIMAL(65,30) NOT NULL,
    "maxValue" DECIMAL(65,30) NOT NULL,
    "initialDeadline" TIMESTAMP(3) NOT NULL,
    "finalDeadline" TIMESTAMP(3) NOT NULL,
    "requiresCounterpart" BOOLEAN NOT NULL,
    "counterpartPercentage" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "typeId" TEXT,

    CONSTRAINT "opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "required_documents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "opportunityId" TEXT NOT NULL,

    CONSTRAINT "required_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "types" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "opportunities_title_key" ON "opportunities"("title");

-- CreateIndex
CREATE UNIQUE INDEX "required_documents_name_key" ON "required_documents"("name");

-- CreateIndex
CREATE UNIQUE INDEX "types_description_key" ON "types"("description");

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "required_documents" ADD CONSTRAINT "required_documents_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "types" ADD CONSTRAINT "types_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
