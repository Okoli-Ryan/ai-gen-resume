import { PanelRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PersonalInfoForm from "../edit-form/personal-info";
import SummaryForm from "../edit-form/summary-info";
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
          <SheetDescription>
            Make changes to your resume here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <Accordion type="single" collapsible>
          {AccordionForms.map((form) => (
            <AccordionItem key={form.displayName} value={form.displayName}>
              <AccordionTrigger>{form.displayName}</AccordionTrigger>
              <AccordionContent>{form()}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SheetContent>
    </Sheet>
  );
};

const AccordionForms = [PersonalInfoForm, SummaryForm, WorkExperienceForm];

export default Sidebar;
