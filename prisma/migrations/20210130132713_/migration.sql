-- CreateEnum
CREATE TYPE "userLevel" AS ENUM ('ADMIN', 'STUDENT', 'TEACHER');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "studentId" TEXT,
    "studentFirstName" TEXT NOT NULL,
    "studentLastName" TEXT NOT NULL,
    "studentEmail" TEXT NOT NULL,
    "studentPassword" TEXT,
    "studentPasswordSalt" TEXT,
    "isActivate" BOOLEAN NOT NULL DEFAULT false,
    "isBanned" BOOLEAN DEFAULT false,
    "loginAttempt" INTEGER DEFAULT 0,
    "userLevel" "userLevel" NOT NULL DEFAULT E'STUDENT',
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountInfo" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "nickname" TEXT,
    "educateGroup" INTEGER NOT NULL,
    "graduateSchool" TEXT,
    "admissionYear" INTEGER,
    "profileImageUrl" TEXT,
    "canContactAddress" TEXT,
    "currentAddress" TEXT,
    "workAddress" TEXT,
    "phoneNumber" TEXT,
    "facebookAccount" TEXT,
    "lineID" TEXT,
    "privacyPermission" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentActivity" (
    "id" TEXT NOT NULL,
    "accountId" TEXT,
    "studentId" TEXT,
    "activityAllCount" INTEGER NOT NULL,
    "activityJoinedCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentGrade" (
    "id" TEXT NOT NULL,
    "StudentId" TEXT NOT NULL,
    "totalCredit" DECIMAL(65,30),
    "totalAverageGrade" DECIMAL(65,30),
    "totalMainSubjectGrade" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activityCalendar" (
    "id" TEXT NOT NULL,
    "activityName" TEXT,
    "activityDetail" TEXT,
    "activityStartDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activityEndDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activityLocation" TEXT,
    "activityImage" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account.studentId_unique" ON "Account"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Account.studentEmail_unique" ON "Account"("studentEmail");

-- CreateIndex
CREATE UNIQUE INDEX "AccountInfo.accountId_unique" ON "AccountInfo"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentActivity.accountId_unique" ON "StudentActivity"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentGrade.accountId_unique" ON "StudentGrade"("accountId");

-- AddForeignKey
ALTER TABLE "AccountInfo" ADD FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentActivity" ADD FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentGrade" ADD FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
