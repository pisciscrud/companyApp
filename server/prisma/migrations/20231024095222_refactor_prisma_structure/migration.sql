/*
  Warnings:

  - You are about to drop the column `company_id` on the `departments` table. All the data in the column will be lost.
  - You are about to drop the column `id_role` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `role_name` on the `roles` table. All the data in the column will be lost.
  - Added the required column `name` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "departments" DROP CONSTRAINT "departments_company_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "fk_role";

-- AlterTable
ALTER TABLE "departments" DROP COLUMN "company_id",
ADD COLUMN     "companyId" INTEGER;

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "id_role",
ADD COLUMN     "role_id" INTEGER;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "role_name",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "fk_role" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
