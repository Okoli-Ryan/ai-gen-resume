ALTER TABLE "resume" ALTER COLUMN "location" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "workExperience" ALTER COLUMN "endDate" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "education" ADD COLUMN "startDate" date NOT NULL;--> statement-breakpoint
ALTER TABLE "education" ADD COLUMN "endDate" date NOT NULL;--> statement-breakpoint
ALTER TABLE "education" ADD COLUMN "isOngoing" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "resume" ADD COLUMN "email" varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE "workExperience" ADD COLUMN "isOngoing" boolean DEFAULT false NOT NULL;