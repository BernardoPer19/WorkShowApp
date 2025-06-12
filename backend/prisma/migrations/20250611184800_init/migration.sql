/*
  Warnings:

  - Added the required column `descCorta` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "descCorta" VARCHAR(150) NOT NULL,
ADD COLUMN     "duration" VARCHAR(50) NOT NULL,
ADD COLUMN     "images" TEXT[];
