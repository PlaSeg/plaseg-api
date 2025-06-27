-- CreateTable
CREATE TABLE "opportunity_requested_itens" (
    "id" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "requestedItemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "opportunity_requested_itens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "opportunity_requested_itens_opportunityId_requestedItemId_key" ON "opportunity_requested_itens"("opportunityId", "requestedItemId");

-- AddForeignKey
ALTER TABLE "opportunity_requested_itens" ADD CONSTRAINT "opportunity_requested_itens_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunity_requested_itens" ADD CONSTRAINT "opportunity_requested_itens_requestedItemId_fkey" FOREIGN KEY ("requestedItemId") REFERENCES "requested_itens"("id") ON DELETE CASCADE ON UPDATE CASCADE;
