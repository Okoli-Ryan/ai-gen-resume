CREATE TABLE "bulletPoints" (
	"text" text NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
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
CREATE TABLE "education" (
	"resumeId" uuid,
	"profileId" uuid,
	"schoolName" varchar(128) NOT NULL,
	"degree" varchar(64) NOT NULL,
	"major" varchar(64) NOT NULL,
	"location" varchar(64) NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"activeStatus" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"userId" uuid NOT NULL,
	"role" varchar(64) NOT NULL,
	"summary" text,
	"location" varchar(64) NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"activeStatus" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projectBulletPoints" (
	"projectId" uuid NOT NULL,
	"bulletPointId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"resumeId" uuid,
	"profileId" uuid,
	"name" varchar(128) NOT NULL,
	"link" varchar(128),
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"activeStatus" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resumes" (
	"name" varchar(64) NOT NULL,
	"summary" text,
	"userId" uuid NOT NULL,
	"jobDescription" text,
	"isPublished" boolean DEFAULT false,
	"role" varchar(64),
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"activeStatus" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "resumes_id_userId_unique" UNIQUE("id","userId")
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"category" varchar(64),
	"resumeId" uuid,
	"profileId" uuid,
	"items" varchar(128)[] DEFAULT ARRAY[]::text[] NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"activeStatus" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"name" varchar(64) NOT NULL,
	"email" varchar(64) NOT NULL,
	"phoneNumber" varchar(32) NOT NULL,
	"linkedinUrl" varchar(128),
	"githubUrl" varchar(128),
	"portfolioUrl" varchar(128),
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"activeStatus" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "workExperienceBulletPoints" (
	"workExperienceId" uuid NOT NULL,
	"bulletPointId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workExperience" (
	"resumeId" uuid,
	"profileId" uuid,
	"companyName" varchar(128) NOT NULL,
	"companyLink" varchar(128),
	"title" varchar(64) NOT NULL,
	"startDate" date NOT NULL,
	"endDate" date,
	"location" varchar(64) NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"activeStatus" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "educationBulletPoints" ADD CONSTRAINT "educationBulletPoints_educationId_education_id_fk" FOREIGN KEY ("educationId") REFERENCES "public"."education"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "educationBulletPoints" ADD CONSTRAINT "educationBulletPoints_bulletPointId_bulletPoints_id_fk" FOREIGN KEY ("bulletPointId") REFERENCES "public"."bulletPoints"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "education" ADD CONSTRAINT "education_resumeId_resumes_id_fk" FOREIGN KEY ("resumeId") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "education" ADD CONSTRAINT "education_profileId_profiles_id_fk" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projectBulletPoints" ADD CONSTRAINT "projectBulletPoints_projectId_projects_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projectBulletPoints" ADD CONSTRAINT "projectBulletPoints_bulletPointId_bulletPoints_id_fk" FOREIGN KEY ("bulletPointId") REFERENCES "public"."bulletPoints"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_resumeId_resumes_id_fk" FOREIGN KEY ("resumeId") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_profileId_profiles_id_fk" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skills" ADD CONSTRAINT "skills_resumeId_resumes_id_fk" FOREIGN KEY ("resumeId") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skills" ADD CONSTRAINT "skills_profileId_profiles_id_fk" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workExperienceBulletPoints" ADD CONSTRAINT "workExperienceBulletPoints_workExperienceId_workExperience_id_fk" FOREIGN KEY ("workExperienceId") REFERENCES "public"."workExperience"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workExperienceBulletPoints" ADD CONSTRAINT "workExperienceBulletPoints_bulletPointId_bulletPoints_id_fk" FOREIGN KEY ("bulletPointId") REFERENCES "public"."bulletPoints"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workExperience" ADD CONSTRAINT "workExperience_resumeId_resumes_id_fk" FOREIGN KEY ("resumeId") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workExperience" ADD CONSTRAINT "workExperience_profileId_profiles_id_fk" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;