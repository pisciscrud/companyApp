/*
  Warnings:

  - You are about to drop the column `role_id` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Position" AS ENUM ('HEAD', 'EMPLOYEE');

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "fk_role";

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "role_id",
ADD COLUMN     "position" "Position" NOT NULL DEFAULT 'EMPLOYEE';

-- DropTable
DROP TABLE "roles";
