/*
  Warnings:

  - You are about to drop the `opportunity_requested_itens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "opportunity_requested_itens" DROP CONSTRAINT "opportunity_requested_itens_opportunityId_fkey";

-- DropForeignKey
ALTER TABLE "opportunity_requested_itens" DROP CONSTRAINT "opportunity_requested_itens_requestedItemId_fkey";

-- DropTable
DROP TABLE "opportunity_requested_itens";

-- CreateTable
CREATE TABLE "opportunity_base_products" (
    "id" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "baseProductId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "opportunity_base_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "opportunity_base_products_opportunityId_baseProductId_key" ON "opportunity_base_products"("opportunityId", "baseProductId");

-- AddForeignKey
ALTER TABLE "opportunity_base_products" ADD CONSTRAINT "opportunity_base_products_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunity_base_products" ADD CONSTRAINT "opportunity_base_products_baseProductId_fkey" FOREIGN KEY ("baseProductId") REFERENCES "base_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
