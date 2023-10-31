/*
  Warnings:

  - Made the column `created_at` on table `departments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `departments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyId` on table `departments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department_id` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `employees` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "departments" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "companyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "department_id" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;
