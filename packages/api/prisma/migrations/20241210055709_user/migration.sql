-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "Schema"("id") ON DELETE SET NULL ON UPDATE CASCADE;
