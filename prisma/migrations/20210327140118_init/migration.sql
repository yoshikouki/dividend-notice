/*
  Warnings:

  - Added the required column `status` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exchange` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assetType` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ipoDate` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delistingDate` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "symbol" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "exchange" TEXT NOT NULL,
ADD COLUMN     "assetType" TEXT NOT NULL,
ADD COLUMN     "ipoDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "delistingDate" TIMESTAMP(3) NOT NULL;
