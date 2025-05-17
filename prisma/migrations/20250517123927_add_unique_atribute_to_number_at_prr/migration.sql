/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `price_registration_records` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "price_registration_records_number_key" ON "price_registration_records"("number");
