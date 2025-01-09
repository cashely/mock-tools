/*
  Warnings:

  - You are about to drop the column `inviterUserId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_inviterUserId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "inviterUserId",
ADD COLUMN     "inviteUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_inviteUserId_fkey" FOREIGN KEY ("inviteUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
