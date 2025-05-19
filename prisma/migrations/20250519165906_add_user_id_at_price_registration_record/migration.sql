/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `price_registration_records` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `price_registration_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "price_registration_records" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "price_registration_records_userId_key" ON "price_registration_records"("userId");

-- AddForeignKey
ALTER TABLE "price_registration_records" ADD CONSTRAINT "price_registration_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
