/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `SavedProject` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `SavedProject` table. All the data in the column will be lost.
  - Changed the type of `projectId` on the `SavedProject` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SavedProject" DROP COLUMN "imageUrl",
DROP COLUMN "title",
DROP COLUMN "projectId",
ADD COLUMN     "projectId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SavedProject_userId_projectId_key" ON "SavedProject"("userId", "projectId");

-- AddForeignKey
ALTER TABLE "SavedProject" ADD CONSTRAINT "SavedProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;
