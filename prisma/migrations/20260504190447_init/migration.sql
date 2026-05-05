-- CreateEnum
CREATE TYPE "HomepageKeys" AS ENUM ('name', 'description', 'address', 'established', 'hero', 'logo', 'phone', 'email', 'instagram', 'twitter', 'youtube');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('ORDER', 'PROCESSING', 'SERVED');

-- CreateTable
CREATE TABLE "Homepage" (
    "key" "HomepageKeys" NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Group" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pre" TEXT NOT NULL,
    "post" TEXT NOT NULL,
    "page" INTEGER NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Allergen" (
    "uuid" TEXT NOT NULL,
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "Allergen_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Product" (
    "uuid" TEXT NOT NULL,
    "plu" INTEGER NOT NULL,
    "groupId" TEXT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "page" INTEGER NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Order" (
    "uuid" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "type" "OrderType" NOT NULL DEFAULT 'ORDER',
    "plu" INTEGER NOT NULL,
    "customer" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "_AllergenToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AllergenToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Homepage_key_key" ON "Homepage"("key");

-- CreateIndex
CREATE INDEX "_AllergenToProduct_B_index" ON "_AllergenToProduct"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AllergenToProduct" ADD CONSTRAINT "_AllergenToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Allergen"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AllergenToProduct" ADD CONSTRAINT "_AllergenToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
