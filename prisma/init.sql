-- ============================================================
-- EQUITY BANK RWANDA PLC — ISMS Database Setup
-- Drop existing objects first, then recreate cleanly
-- ============================================================

-- Drop Tables (in reverse dependency order)
DROP TABLE IF EXISTS "training_results" CASCADE;
DROP TABLE IF EXISTS "training_courses" CASCADE;
DROP TABLE IF EXISTS "phishing_simulations" CASCADE;
DROP TABLE IF EXISTS "audit_logs" CASCADE;
DROP TABLE IF EXISTS "encryption_assets" CASCADE;
DROP TABLE IF EXISTS "policy_acknowledgments" CASCADE;
DROP TABLE IF EXISTS "policies" CASCADE;
DROP TABLE IF EXISTS "access_reviews" CASCADE;
DROP TABLE IF EXISTS "incident_updates" CASCADE;
DROP TABLE IF EXISTS "incidents" CASCADE;
DROP TABLE IF EXISTS "risks" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;

-- Drop Enums
DROP TYPE IF EXISTS "UserRole" CASCADE;
DROP TYPE IF EXISTS "UserStatus" CASCADE;
DROP TYPE IF EXISTS "RiskLevel" CASCADE;
DROP TYPE IF EXISTS "RiskTreatment" CASCADE;
DROP TYPE IF EXISTS "RiskStatus" CASCADE;
DROP TYPE IF EXISTS "IncidentSeverity" CASCADE;
DROP TYPE IF EXISTS "IncidentStatus" CASCADE;
DROP TYPE IF EXISTS "AccessLevel" CASCADE;
DROP TYPE IF EXISTS "ReviewStatus" CASCADE;
DROP TYPE IF EXISTS "PolicyStatus" CASCADE;
DROP TYPE IF EXISTS "PolicyCategory" CASCADE;
DROP TYPE IF EXISTS "EncryptionStatus" CASCADE;
DROP TYPE IF EXISTS "LogSeverity" CASCADE;
DROP TYPE IF EXISTS "TrainingStatus" CASCADE;

-- ============================================================
-- CREATE ENUMS
-- ============================================================

CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SECURITY_OFFICER', 'AUDITOR', 'ANALYST');
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
CREATE TYPE "RiskTreatment" AS ENUM ('MITIGATE', 'AVOID', 'TRANSFER', 'ACCEPT');
CREATE TYPE "RiskStatus" AS ENUM ('OPEN', 'IN_TREATMENT', 'RESOLVED', 'ACCEPTED');
CREATE TYPE "IncidentSeverity" AS ENUM ('P1_CRITICAL', 'P2_HIGH', 'P3_MEDIUM', 'P4_LOW');
CREATE TYPE "IncidentStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'CONTAINED', 'ERADICATED', 'RESOLVED', 'CLOSED');
CREATE TYPE "AccessLevel" AS ENUM ('READ', 'WRITE', 'ADMIN', 'PRIVILEGED');
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REVOKED', 'OVERDUE');
CREATE TYPE "PolicyStatus" AS ENUM ('DRAFT', 'ACTIVE', 'UNDER_REVIEW', 'ARCHIVED');
CREATE TYPE "PolicyCategory" AS ENUM ('ACCESS_CONTROL', 'CRYPTOGRAPHIC', 'DATA_CLASSIFICATION', 'INCIDENT_RESPONSE', 'ACCEPTABLE_USE', 'THIRD_PARTY', 'REMOTE_WORK', 'BUSINESS_CONTINUITY');
CREATE TYPE "EncryptionStatus" AS ENUM ('COMPLIANT', 'NEEDS_ROTATION', 'NON_COMPLIANT', 'PENDING');
CREATE TYPE "LogSeverity" AS ENUM ('INFO', 'WARNING', 'ERROR', 'CRITICAL');
CREATE TYPE "TrainingStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'OVERDUE');

-- ============================================================
-- CREATE TABLES
-- ============================================================

CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'ANALYST',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "department" TEXT NOT NULL,
    "jobTitle" TEXT,
    "phone" TEXT,
    "avatar" TEXT,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "risks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "asset" TEXT NOT NULL,
    "threat" TEXT NOT NULL,
    "vulnerability" TEXT NOT NULL,
    "likelihood" INTEGER NOT NULL,
    "impact" INTEGER NOT NULL,
    "riskScore" INTEGER NOT NULL,
    "level" "RiskLevel" NOT NULL,
    "treatment" "RiskTreatment" NOT NULL,
    "status" "RiskStatus" NOT NULL DEFAULT 'OPEN',
    "category" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "reviewDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "risks_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "incidents" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "severity" "IncidentSeverity" NOT NULL,
    "status" "IncidentStatus" NOT NULL DEFAULT 'OPEN',
    "category" TEXT NOT NULL,
    "affectedSystems" TEXT[],
    "reporterId" TEXT NOT NULL,
    "assigneeId" TEXT,
    "detectedAt" TIMESTAMP(3) NOT NULL,
    "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "containedAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),
    "closedAt" TIMESTAMP(3),
    "rootCause" TEXT,
    "lessonsLearned" TEXT,
    "regulatoryNotificationRequired" BOOLEAN NOT NULL DEFAULT false,
    "regulatoryNotifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "incidents_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "incident_updates" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "incident_updates_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "access_reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "system" TEXT NOT NULL,
    "accessLevel" "AccessLevel" NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "lastReviewed" TIMESTAMP(3),
    "nextReview" TIMESTAMP(3) NOT NULL,
    "reviewedBy" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "access_reviews_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "policies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "PolicyCategory" NOT NULL,
    "content" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "status" "PolicyStatus" NOT NULL DEFAULT 'DRAFT',
    "owner" TEXT NOT NULL,
    "reviewDate" TIMESTAMP(3) NOT NULL,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "policies_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "policy_acknowledgments" (
    "id" TEXT NOT NULL,
    "policyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "acknowledgedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "policy_acknowledgments_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "encryption_assets" (
    "id" TEXT NOT NULL,
    "system" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "algorithm" TEXT NOT NULL,
    "keyLength" INTEGER NOT NULL,
    "dataState" TEXT NOT NULL,
    "status" "EncryptionStatus" NOT NULL DEFAULT 'COMPLIANT',
    "lastRotated" TIMESTAMP(3),
    "nextRotation" TIMESTAMP(3),
    "managedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "encryption_assets_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "resourceId" TEXT,
    "details" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "severity" "LogSeverity" NOT NULL DEFAULT 'INFO',
    "success" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "training_courses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "targetRole" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "passingScore" INTEGER NOT NULL DEFAULT 80,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "mandatory" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "training_courses_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "training_results" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "TrainingStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "score" INTEGER,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "training_results_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "phishing_simulations" (
    "id" TEXT NOT NULL,
    "campaignName" TEXT NOT NULL,
    "sentCount" INTEGER NOT NULL,
    "clickedCount" INTEGER NOT NULL,
    "reportedCount" INTEGER NOT NULL,
    "department" TEXT NOT NULL,
    "conductedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "phishing_simulations_pkey" PRIMARY KEY ("id")
);

-- ============================================================
-- CREATE INDEXES
-- ============================================================

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "policy_acknowledgments_policyId_userId_key" ON "policy_acknowledgments"("policyId", "userId");
CREATE UNIQUE INDEX "training_results_courseId_userId_key" ON "training_results"("courseId", "userId");

-- ============================================================
-- ADD FOREIGN KEYS
-- ============================================================

ALTER TABLE "risks" ADD CONSTRAINT "risks_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "incident_updates" ADD CONSTRAINT "incident_updates_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "incidents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "access_reviews" ADD CONSTRAINT "access_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "policy_acknowledgments" ADD CONSTRAINT "policy_acknowledgments_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "policy_acknowledgments" ADD CONSTRAINT "policy_acknowledgments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "training_results" ADD CONSTRAINT "training_results_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "training_courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "training_results" ADD CONSTRAINT "training_results_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
