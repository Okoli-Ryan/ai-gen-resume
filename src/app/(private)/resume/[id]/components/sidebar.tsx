import { PanelRight } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ResumeFormSections } from "@/lib/constants";
import { useResumeContext } from "../providers/resume-provider";
import { useSession } from "next-auth/react";
import {
    TEducation,
    ToBulletPointObj,
    TPersonalInfo,
    TProject,
    TSkill,
    TWorkExperience,
} from "@/lib/types";
import { TSkillForm } from "@/app/components/edit-form/skills-form";
import { TProjectForm } from "@/app/components/edit-form/projects-form";
import { education, projects } from "@/db/schema";
import { TEducationForm } from "@/app/components/edit-form/education-form";
import { TWorkExperienceForm } from "@/app/components/edit-form/work-experience-form";
import { TPersonalInfoForm } from "@/app/components/edit-form/personal-info-form";

const Sidebar = () => {
    const { resume: initialResume } = useResumeContext();
    const session = useSession();

    const initialPersonalInfo: TPersonalInfoForm = {
        personalInfo: {
            email: initialResume?.email || session?.data?.user.email || "",
            githubUrl: initialResume?.githubUrl || "",
            linkedinUrl: initialResume?.linkedinUrl || "",
            location: initialResume?.location || "",
            name: initialResume?.name || session.data?.user.name || "",
            phoneNumber: initialResume?.phoneNumber || "",
            portfolioUrl: initialResume?.portfolioUrl || "",
            role: initialResume?.role || "",
        },
    };

    const initialSummary = initialResume?.summary || "";

    const initialWorkExperience: TWorkExperienceForm = {
        workExperience: (initialResume?.workExperience || []).map(
            (workExperience) => ({
                companyLink: workExperience.companyLink || "",
                title: workExperience.title,
                startDate: workExperience.startDate,
                endDate: workExperience.endDate,
                location: workExperience.location,
                companyName: workExperience.companyName,
                bulletPoints: workExperience.bulletPoints.map(
                    (bulletPoint) => ({
                        text: bulletPoint.text,
                    })
                ),
            })
        ),
    };

    const initialEducation: TEducationForm = {
        education: (initialResume?.education || []).map((education) => ({
            schoolName: education.schoolName,
            major: education.major,
            location: education.location,
            degree: education.degree,
            startDate: education.startDate,
            endDate: education.endDate,
            isOngoing: education.isOngoing,
            bulletPoints: (education.bulletPoints || []).map((bulletPoint) => ({
                text: bulletPoint.text,
            })),
        })),
    };

    const initialProjects: TProjectForm = {
        projects: (initialResume?.projects || []).map((project) => ({
            bulletPoints: (project.bulletPoints || []).map((bulletPoint) => ({
                text: bulletPoint.text,
            })),
            name: project.name,
            link: project.link || "",
        })),
    };

    const initialSkills: TSkillForm = {
        skills: (initialResume?.skills || []).map((resumeSkill) => ({
            category: resumeSkill.category || "",
            skills: resumeSkill.items.map((item) => ({ text: item })),
        })),
    };

//     Complete resume form initial data

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="fixed bottom-8 right-8 size-12 flex justify-center items-center rounded-full bg-primary text-white shadow-lg">
                    <PanelRight />
                </Button>
            </SheetTrigger>
            <SheetContent className="md:max-w-[600px]">
                <SheetHeader>
                    <SheetTitle>Update details</SheetTitle>
                    <SheetDescription>
                        Make changes to your resume here. Click save when
                        you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <div className="h-[calc(100dvh-7rem)] overflow-auto">
                    <Accordion type="single" collapsible>
                        {ResumeFormSections.map((ResumeForm) => (
                            <AccordionItem
                                key={ResumeForm.displayName}
                                value={ResumeForm.displayName}
                            >
                                <AccordionTrigger>
                                    {ResumeForm.displayName}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ResumeForm />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default Sidebar;
