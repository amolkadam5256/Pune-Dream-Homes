/*
  Warnings:

  - You are about to drop the column `builderId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `builderId` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the `builders` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `properties` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `builderName` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "builders" DROP CONSTRAINT "builders_userId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_builderId_fkey";

-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_builderId_fkey";

-- DropIndex
DROP INDEX "appointments_propertyId_idx";

-- DropIndex
DROP INDEX "inquiries_propertyId_idx";

-- DropIndex
DROP INDEX "projects_builderId_idx";

-- DropIndex
DROP INDEX "properties_approvalStatus_idx";

-- AlterTable
ALTER TABLE "agents" ADD COLUMN     "areasServed" TEXT[],
ADD COLUMN     "availabilityStatus" TEXT NOT NULL DEFAULT 'AVAILABLE',
ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "responseTime" INTEGER,
ADD COLUMN     "successRate" DOUBLE PRECISION,
ADD COLUMN     "totalReviews" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "rating" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "amenities" ADD COLUMN     "description" TEXT,
ADD COLUMN     "displayOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "appointmentType" TEXT,
ADD COLUMN     "cancellationReason" TEXT,
ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "rating" INTEGER,
ADD COLUMN     "reminder1Sent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reminder2Sent" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "authorImage" TEXT,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "shareCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "cities" ADD COLUMN     "averagePrice" DOUBLE PRECISION,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "propertyCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "floor_plans" ADD COLUMN     "availableUnits" INTEGER,
ADD COLUMN     "balconies" INTEGER,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "superBuiltUpArea" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "inquiries" ADD COLUMN     "budget" TEXT,
ADD COLUMN     "financing" TEXT,
ADD COLUMN     "moveInDate" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "priority" TEXT DEFAULT 'MEDIUM',
ADD COLUMN     "respondedAt" TIMESTAMP(3),
ADD COLUMN     "respondedBy" TEXT;

-- AlterTable
ALTER TABLE "localities" ADD COLUMN     "infrastructure" TEXT,
ADD COLUMN     "isTrending" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "priceGrowth" DOUBLE PRECISION,
ADD COLUMN     "propertyCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "nearby_places" ADD COLUMN     "description" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "builderId",
ADD COLUMN     "bankApprovals" TEXT[],
ADD COLUMN     "builderContact" TEXT,
ADD COLUMN     "builderEmail" TEXT,
ADD COLUMN     "builderName" TEXT NOT NULL,
ADD COLUMN     "builderWebsite" TEXT,
ADD COLUMN     "completionDate" TIMESTAMP(3),
ADD COLUMN     "favoriteCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "keywords" TEXT[],
ADD COLUMN     "landArea" DOUBLE PRECISION,
ADD COLUMN     "landmark" TEXT,
ADD COLUMN     "masterPlanUrl" TEXT,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "openArea" DOUBLE PRECISION,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "reraApprovalDate" TIMESTAMP(3),
ADD COLUMN     "shareCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "soldUnits" INTEGER,
ADD COLUMN     "totalFloors" INTEGER;

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "builderId",
ADD COLUMN     "approvedBy" TEXT,
ADD COLUMN     "brochureUrl" TEXT,
ADD COLUMN     "callCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactNumber" TEXT,
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "floorPlanUrl" TEXT,
ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "keywords" TEXT[],
ADD COLUMN     "lastUpdatedAt" TIMESTAMP(3),
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "occupancyCertificate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ownerName" TEXT,
ADD COLUMN     "ownershipType" TEXT,
ADD COLUMN     "possessionStatus" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "shareCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "superBuiltUpArea" DOUBLE PRECISION,
ADD COLUMN     "taxReceipts" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tokenAmount" DOUBLE PRECISION,
ADD COLUMN     "verifiedDate" TIMESTAMP(3),
ADD COLUMN     "whatsappNumber" TEXT;

-- AlterTable
ALTER TABLE "property_images" ADD COLUMN     "category" TEXT;

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "cons" TEXT[],
ADD COLUMN     "helpfulCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "notHelpfulCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "pros" TEXT[],
ADD COLUMN     "replyDate" TIMESTAMP(3),
ADD COLUMN     "replyText" TEXT,
ADD COLUMN     "verifiedPurchase" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "saved_searches" ADD COLUMN     "frequency" TEXT DEFAULT 'DAILY',
ADD COLUMN     "lastNotified" TIMESTAMP(3),
ADD COLUMN     "matchCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "site_settings" ADD COLUMN     "category" TEXT,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "country" TEXT DEFAULT 'India',
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ADD COLUMN     "notificationEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "pincode" TEXT,
ADD COLUMN     "preferredLanguage" TEXT DEFAULT 'English',
ADD COLUMN     "smsNotifications" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "website" TEXT;

-- DropTable
DROP TABLE "builders";

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notifications_userId_isRead_idx" ON "notifications"("userId", "isRead");

-- CreateIndex
CREATE INDEX "notifications_createdAt_idx" ON "notifications"("createdAt");

-- CreateIndex
CREATE INDEX "agents_isVerified_isPremium_idx" ON "agents"("isVerified", "isPremium");

-- CreateIndex
CREATE INDEX "agents_rating_idx" ON "agents"("rating");

-- CreateIndex
CREATE INDEX "amenities_category_idx" ON "amenities"("category");

-- CreateIndex
CREATE INDEX "appointments_propertyId_status_idx" ON "appointments"("propertyId", "status");

-- CreateIndex
CREATE INDEX "appointments_agentId_status_idx" ON "appointments"("agentId", "status");

-- CreateIndex
CREATE INDEX "appointments_scheduledDate_idx" ON "appointments"("scheduledDate");

-- CreateIndex
CREATE INDEX "blogs_isPublished_isFeatured_idx" ON "blogs"("isPublished", "isFeatured");

-- CreateIndex
CREATE INDEX "cities_state_idx" ON "cities"("state");

-- CreateIndex
CREATE INDEX "cities_isFeatured_idx" ON "cities"("isFeatured");

-- CreateIndex
CREATE INDEX "favorites_userId_idx" ON "favorites"("userId");

-- CreateIndex
CREATE INDEX "floor_plans_projectId_idx" ON "floor_plans"("projectId");

-- CreateIndex
CREATE INDEX "inquiries_propertyId_status_idx" ON "inquiries"("propertyId", "status");

-- CreateIndex
CREATE INDEX "inquiries_status_priority_idx" ON "inquiries"("status", "priority");

-- CreateIndex
CREATE INDEX "localities_isPopular_isTrending_idx" ON "localities"("isPopular", "isTrending");

-- CreateIndex
CREATE INDEX "localities_pricePerSqft_idx" ON "localities"("pricePerSqft");

-- CreateIndex
CREATE INDEX "nearby_places_localityId_category_idx" ON "nearby_places"("localityId", "category");

-- CreateIndex
CREATE INDEX "project_images_projectId_orderIndex_idx" ON "project_images"("projectId", "orderIndex");

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE INDEX "projects_projectStatus_idx" ON "projects"("projectStatus");

-- CreateIndex
CREATE INDEX "projects_isFeatured_isPremium_idx" ON "projects"("isFeatured", "isPremium");

-- CreateIndex
CREATE INDEX "projects_slug_idx" ON "projects"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "properties_slug_key" ON "properties"("slug");

-- CreateIndex
CREATE INDEX "properties_approvalStatus_availabilityStatus_idx" ON "properties"("approvalStatus", "availabilityStatus");

-- CreateIndex
CREATE INDEX "properties_isFeatured_isPremium_idx" ON "properties"("isFeatured", "isPremium");

-- CreateIndex
CREATE INDEX "properties_userId_idx" ON "properties"("userId");

-- CreateIndex
CREATE INDEX "properties_slug_idx" ON "properties"("slug");

-- CreateIndex
CREATE INDEX "property_images_propertyId_orderIndex_idx" ON "property_images"("propertyId", "orderIndex");

-- CreateIndex
CREATE INDEX "reviews_propertyId_isApproved_idx" ON "reviews"("propertyId", "isApproved");

-- CreateIndex
CREATE INDEX "reviews_projectId_isApproved_idx" ON "reviews"("projectId", "isApproved");

-- CreateIndex
CREATE INDEX "reviews_rating_idx" ON "reviews"("rating");

-- CreateIndex
CREATE INDEX "saved_searches_userId_idx" ON "saved_searches"("userId");

-- CreateIndex
CREATE INDEX "site_settings_category_idx" ON "site_settings"("category");
