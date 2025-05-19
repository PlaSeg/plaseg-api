/*
  Warnings:

  - Changed the type of `year` on the `price_registration_records` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "price_registration_records_userId_key";

-- AlterTable
ALTER TABLE "price_registration_records" DROP COLUMN "year",
ADD COLUMN     "year" INTEGER NOT NULL;
