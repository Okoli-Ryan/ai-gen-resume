CREATE TABLE "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE "authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bulletPoint" (
	"text" text NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"activeStatus" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "education" (
	"resumeId" uuid,
	"schoolName" varchar(128) NOT NULL,
	"degree" varchar(64) NOT NULL,
	"major" varchar(64) NOT NULL,
	"location" varchar(64) NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"activeStatus" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "educationBulletPoints" (
	"educationId" uuid NOT NULL,
	"bulletPointId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projectBulletPoints" (
	"projectId" uuid NOT NULL,
	"bulletPointId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project" (
	"resumeId" uuid,
	"name" varchar(128) NOT NULL,
	"link" varchar(128),
	"id" uuid PRIMARY KEY NOT NULL,
	"activeStatus" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resume" (
	"name" varchar(64) NOT NULL,
	"summary" text,
	"userId" text NOT NULL,
	"jobDescription" text,
	"isPublished" boolean DEFAULT false,
	"role" varchar(64),
	"location" varchar(64) NOT NULL,
	"phoneNumber" varchar(32),
	"linkedinUrl" varchar(128),
	"githubUrl" varchar(128),
	"portfolioUrl" varchar(128),
	"id" uuid PRIMARY KEY NOT NULL,
	"activeStatus" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "resume_id_userId_unique" UNIQUE("id","userId")
);
--> statement-breakpoint
CREATE TABLE "skill" (
	"category" varchar(64),
	"resumeId" uuid,
	"items" varchar(128)[] DEFAULT ARRAY[]::text[] NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"activeStatus" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workExperience" (
	"resumeId" uuid,
	"companyName" varchar(128) NOT NULL,
	"companyLink" varchar(128),
	"title" varchar(64) NOT NULL,
	"startDate" date NOT NULL,
	"endDate" date,
	"location" varchar(64) NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"activeStatus" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workExperienceBulletPoints" (
	"workExperienceId" uuid NOT NULL,
	"bulletPointId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"name" varchar(64) NOT NULL,
	"email" varchar(64) NOT NULL,
	"activeStatus" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "education" ADD CONSTRAINT "education_resumeId_resume_id_fk" FOREIGN KEY ("resumeId") REFERENCES "public"."resume"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "educationBulletPoints" ADD CONSTRAINT "educationBulletPoints_educationId_education_id_fk" FOREIGN KEY ("educationId") REFERENCES "public"."education"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "educationBulletPoints" ADD CONSTRAINT "educationBulletPoints_bulletPointId_bulletPoint_id_fk" FOREIGN KEY ("bulletPointId") REFERENCES "public"."bulletPoint"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projectBulletPoints" ADD CONSTRAINT "projectBulletPoints_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projectBulletPoints" ADD CONSTRAINT "projectBulletPoints_bulletPointId_bulletPoint_id_fk" FOREIGN KEY ("bulletPointId") REFERENCES "public"."bulletPoint"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_resumeId_resume_id_fk" FOREIGN KEY ("resumeId") REFERENCES "public"."resume"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resume" ADD CONSTRAINT "resume_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skill" ADD CONSTRAINT "skill_resumeId_resume_id_fk" FOREIGN KEY ("resumeId") REFERENCES "public"."resume"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workExperience" ADD CONSTRAINT "workExperience_resumeId_resume_id_fk" FOREIGN KEY ("resumeId") REFERENCES "public"."resume"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workExperienceBulletPoints" ADD CONSTRAINT "workExperienceBulletPoints_workExperienceId_workExperience_id_fk" FOREIGN KEY ("workExperienceId") REFERENCES "public"."workExperience"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workExperienceBulletPoints" ADD CONSTRAINT "workExperienceBulletPoints_bulletPointId_bulletPoint_id_fk" FOREIGN KEY ("bulletPointId") REFERENCES "public"."bulletPoint"("id") ON DELETE no action ON UPDATE no action;