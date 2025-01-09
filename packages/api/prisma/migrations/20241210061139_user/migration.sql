/*
  Warnings:

  - A unique constraint covering the columns `[scheduleId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_latestCreatorId_fkey";

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "latestCreatorId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Document_scheduleId_key" ON "Document"("scheduleId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_latestCreatorId_fkey" FOREIGN KEY ("latestCreatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
