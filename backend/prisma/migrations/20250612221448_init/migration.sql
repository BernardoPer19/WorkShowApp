-- CreateTable
CREATE TABLE "Subcategory" (
    "subcategory_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" UUID NOT NULL,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("subcategory_id")
);

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
