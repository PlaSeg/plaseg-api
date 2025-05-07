-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('UF', 'MUNICIPALITY');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('CLT', 'PJ', 'OTHERS');

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updatedAt" DROP NOT NULL;

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
CREATE TABLE "AllocationDepartment" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "municipalityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "AllocationDepartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaintenanceContract" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "municipalityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "MaintenanceContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QualifiedStaff" (
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

    CONSTRAINT "QualifiedStaff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectPartnership" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "municipalityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ProjectPartnership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Management" (
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

    CONSTRAINT "Management_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opportunity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "availableValue" DECIMAL(65,30) NOT NULL,
    "minValue" DECIMAL(65,30) NOT NULL,
    "maxValue" DECIMAL(65,30) NOT NULL,
    "initialDeadline" TIMESTAMP(3) NOT NULL,
    "finalDeadline" TIMESTAMP(3) NOT NULL,
    "requiresCounterpart" BOOLEAN NOT NULL,
    "counterpartPercentage" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MandatoryDocument" (
    "id" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MandatoryDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpportunityMandatoryDocument" (
    "id" TEXT NOT NULL,
    "mandatoryDocumentId" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OpportunityMandatoryDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "municipalities_userId_key" ON "municipalities"("userId");

-- AddForeignKey
ALTER TABLE "municipalities" ADD CONSTRAINT "municipalities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllocationDepartment" ADD CONSTRAINT "AllocationDepartment_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceContract" ADD CONSTRAINT "MaintenanceContract_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QualifiedStaff" ADD CONSTRAINT "QualifiedStaff_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPartnership" ADD CONSTRAINT "ProjectPartnership_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Management" ADD CONSTRAINT "Management_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityMandatoryDocument" ADD CONSTRAINT "OpportunityMandatoryDocument_mandatoryDocumentId_fkey" FOREIGN KEY ("mandatoryDocumentId") REFERENCES "MandatoryDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityMandatoryDocument" ADD CONSTRAINT "OpportunityMandatoryDocument_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
