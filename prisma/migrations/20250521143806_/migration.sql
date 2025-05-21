-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MUNICIPALITY', 'COMPANY', 'ADMIN_MASTER');

-- CreateEnum
CREATE TYPE "TypeGroup" AS ENUM ('SERVICE', 'OPPORTUNITY', 'CATEGORY');

-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('UF', 'MUNICIPALITY');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('CLT', 'PJ', 'OTHERS');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MUNICIPALITY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "municipalities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "guardInitialDate" TIMESTAMP(3) NOT NULL,
    "guardCount" INTEGER NOT NULL,
    "trafficInitialDate" TIMESTAMP(3) NOT NULL,
    "trafficCount" INTEGER NOT NULL,
    "federativeUnit" TEXT NOT NULL,
    "unitType" "UnitType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "municipalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allocation_departments" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "municipalityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "allocation_departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_contracts" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "municipalityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "maintenance_contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qualified_staffs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "employmentType" "EmploymentType" NOT NULL,
    "document" TEXT NOT NULL,
    "isResponsible" BOOLEAN NOT NULL,
    "municipalityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "qualified_staffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_partnerships" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "municipalityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "project_partnerships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "managements" (
    "id" TEXT NOT NULL,
    "initialDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "managerName" TEXT NOT NULL,
    "managerCpf" TEXT NOT NULL,
    "managerEmail" TEXT NOT NULL,
    "managerAddress" TEXT NOT NULL,
    "managerPhone" TEXT NOT NULL,
    "adminManagerName" TEXT NOT NULL,
    "adminManagerCpf" TEXT NOT NULL,
    "adminManagerEmail" TEXT NOT NULL,
    "adminManagerAddress" TEXT NOT NULL,
    "adminManagerPhone" TEXT NOT NULL,
    "legislationName" TEXT NOT NULL,
    "legislationCpf" TEXT NOT NULL,
    "legislationEmail" TEXT NOT NULL,
    "legislationAddress" TEXT NOT NULL,
    "legislationPhone" TEXT NOT NULL,
    "municipalityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "managements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opportunities" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "responsibleAgency" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "availableValue" DECIMAL(65,30) NOT NULL,
    "minValue" DECIMAL(65,30) NOT NULL,
    "maxValue" DECIMAL(65,30) NOT NULL,
    "initialDeadline" TIMESTAMP(3) NOT NULL,
    "finalDeadline" TIMESTAMP(3) NOT NULL,
    "requiresCounterpart" BOOLEAN NOT NULL,
    "counterpartPercentage" DECIMAL(65,30) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "typeId" TEXT NOT NULL,

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
    "group" "TypeGroup" NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_products" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "technicalDescription" TEXT NOT NULL,
    "budget1" DECIMAL(65,30) NOT NULL,
    "budget1Validity" TIMESTAMP(3) NOT NULL,
    "budget2" DECIMAL(65,30) NOT NULL,
    "budget2Validity" TIMESTAMP(3) NOT NULL,
    "budget3" DECIMAL(65,30) NOT NULL,
    "budget3Validity" TIMESTAMP(3) NOT NULL,
    "unitValue" DECIMAL(65,30) NOT NULL,
    "typeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "base_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "legalName" TEXT NOT NULL,
    "tradeName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "portfolioDescription" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specific_products" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unitValue" DECIMAL(65,30) NOT NULL,
    "warrantyMonths" INTEGER NOT NULL,
    "budget" DECIMAL(65,30) NOT NULL,
    "budgetValidity" TIMESTAMP(3) NOT NULL,
    "baseProductId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "specific_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_registration_records" (
    "id" TEXT NOT NULL,
    "publicAgency" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "companyId" TEXT,

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
    "specificProductId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "price_registration_record_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_document_key" ON "users"("document");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "municipalities_userId_key" ON "municipalities"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "opportunities_title_key" ON "opportunities"("title");

-- CreateIndex
CREATE UNIQUE INDEX "opportunities_slug_key" ON "opportunities"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "required_documents_name_key" ON "required_documents"("name");

-- CreateIndex
CREATE UNIQUE INDEX "types_description_key" ON "types"("description");

-- CreateIndex
CREATE UNIQUE INDEX "base_products_code_key" ON "base_products"("code");

-- CreateIndex
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companies_phone_key" ON "companies"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "companies_userId_key" ON "companies"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "price_registration_records_number_key" ON "price_registration_records"("number");

-- AddForeignKey
ALTER TABLE "municipalities" ADD CONSTRAINT "municipalities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allocation_departments" ADD CONSTRAINT "allocation_departments_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_contracts" ADD CONSTRAINT "maintenance_contracts_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qualified_staffs" ADD CONSTRAINT "qualified_staffs_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_partnerships" ADD CONSTRAINT "project_partnerships_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managements" ADD CONSTRAINT "managements_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "required_documents" ADD CONSTRAINT "required_documents_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "types" ADD CONSTRAINT "types_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_products" ADD CONSTRAINT "base_products_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specific_products" ADD CONSTRAINT "specific_products_baseProductId_fkey" FOREIGN KEY ("baseProductId") REFERENCES "base_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specific_products" ADD CONSTRAINT "specific_products_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_registration_records" ADD CONSTRAINT "price_registration_records_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_registration_record_items" ADD CONSTRAINT "price_registration_record_items_priceRegistrationRecordId_fkey" FOREIGN KEY ("priceRegistrationRecordId") REFERENCES "price_registration_records"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_registration_record_items" ADD CONSTRAINT "price_registration_record_items_specificProductId_fkey" FOREIGN KEY ("specificProductId") REFERENCES "specific_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
