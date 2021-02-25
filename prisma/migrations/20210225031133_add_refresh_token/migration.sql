/*
  Warnings:

  - You are about to alter the column `totalCredit` on the `StudentGrade` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `totalAverageGrade` on the `StudentGrade` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `totalMainSubjectGrade` on the `StudentGrade` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "refreshToken" TEXT;

-- AlterTable
ALTER TABLE "StudentGrade" ALTER COLUMN "totalCredit" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "totalAverageGrade" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "totalMainSubjectGrade" SET DATA TYPE DOUBLE PRECISION;
