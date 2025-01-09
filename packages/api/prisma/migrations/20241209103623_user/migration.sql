-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "intro" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "stock" INTEGER DEFAULT 50,
ADD COLUMN     "wxid" TEXT;
