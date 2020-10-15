# Migration `20201014074950-101402`

This migration has been generated by Sopanat at 10/14/2020, 2:49:50 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "dev"."activityCalendar" ADD COLUMN "activityImage" text   ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201014072208-101401..20201014074950-101402
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Account {
    id String @id @default(uuid())
@@ -72,8 +72,9 @@
   activityDetail String?
   activityStartDate DateTime @default(now())
   activityEndDate DateTime @default(now())
   activityLocation String?
+  activityImage String?
 }
```

