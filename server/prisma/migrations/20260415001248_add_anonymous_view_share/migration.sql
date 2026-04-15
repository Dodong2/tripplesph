-- AlterTable
ALTER TABLE "Share" ADD COLUMN     "visitorId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "View" ADD COLUMN     "visitorId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;
