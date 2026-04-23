-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "archivedAt" TIMESTAMP(3),
ADD COLUMN     "archivedBy" TEXT,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_archivedBy_fkey" FOREIGN KEY ("archivedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
