import { PanelRight } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import EducationForm from "../edit-form/education-form";
import PersonalInfoForm from "../edit-form/personal-info-form";
import SkillsForm from "../edit-form/skills-form";
import SummaryForm from "../edit-form/summary-form";
import WorkExperienceForm from "../edit-form/work-experience-form";

const Sidebar = () => {
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
					<SheetDescription>Make changes to your resume here. Click save when you&apos;re done.</SheetDescription>
				</SheetHeader>
				<div className="h-[calc(100dvh-7rem)] overflow-auto">
					<Accordion type="single" collapsible>
						{AccordionForms.map((form) => (
							<AccordionItem key={form.displayName} value={form.displayName}>
								<AccordionTrigger>{form.displayName}</AccordionTrigger>
								<AccordionContent>{form()}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</SheetContent>
		</Sheet>
	);
};

const AccordionForms = [PersonalInfoForm, SummaryForm, WorkExperienceForm, EducationForm, SkillsForm];

export default Sidebar;
