/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_d` on the `categories` table. All the data in the column will be lost.
  - The `createCollection_at` column on the `collections` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `project_media` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `media_:id` on the `project_media` table. All the data in the column will be lost.
  - The required column `category_id` was added to the `categories` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `media:id` to the `project_media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_category_id_fkey";

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
DROP COLUMN "category_d",
ADD COLUMN     "category_id" UUID NOT NULL,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id");

-- AlterTable
ALTER TABLE "collections" DROP COLUMN "createCollection_at",
ADD COLUMN     "createCollection_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "project_media" DROP CONSTRAINT "project_media_pkey",
DROP COLUMN "media_:id",
ADD COLUMN     "media:id" UUID NOT NULL,
ADD CONSTRAINT "project_media_pkey" PRIMARY KEY ("media:id");

-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "createProject_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
