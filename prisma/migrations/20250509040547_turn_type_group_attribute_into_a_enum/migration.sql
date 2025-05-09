/*
  Warnings:

  - Changed the type of `group` on the `types` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TypeGroup" AS ENUM ('CATEGORY', 'OPPORTUNITY', 'SUBCATEGORY', 'SUBSUBCATEGORY');

-- AlterTable
ALTER TABLE "types" DROP COLUMN "group",
ADD COLUMN     "group" "TypeGroup" NOT NULL;
