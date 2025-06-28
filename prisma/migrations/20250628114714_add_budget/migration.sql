/*
  Warnings:

  - Added the required column `budget` to the `requested_itens` table without a default value. This is not possible if the table is not empty.

*/
-- Step 1: Add the column as nullable
ALTER TABLE "requested_itens" ADD COLUMN "budget" DECIMAL(65,30) NULL;

-- Step 2: Backfill existing rows with a default value (e.g., 0)
UPDATE "requested_itens" SET "budget" = 0 WHERE "budget" IS NULL;

-- Step 3: Enforce NOT NULL constraint
ALTER TABLE "requested_itens" ALTER COLUMN "budget" SET NOT NULL;
