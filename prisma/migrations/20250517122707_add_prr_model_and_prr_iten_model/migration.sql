-- CreateTable
CREATE TABLE "price_registration_records" (
    "id" TEXT NOT NULL,
    "publicAgency" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "price_registration_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_registration_record_items" (
    "id" TEXT NOT NULL,
    "unitValue" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "minAdherenceQuantity" INTEGER NOT NULL,
    "maxAdherenceQuantity" INTEGER NOT NULL,
    "priceRegistrationRecordId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "price_registration_record_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "price_registration_record_items" ADD CONSTRAINT "price_registration_record_items_priceRegistrationRecordId_fkey" FOREIGN KEY ("priceRegistrationRecordId") REFERENCES "price_registration_records"("id") ON DELETE CASCADE ON UPDATE CASCADE;
