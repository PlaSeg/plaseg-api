/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `project_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "project_types_name_key" ON "project_types"("name");
