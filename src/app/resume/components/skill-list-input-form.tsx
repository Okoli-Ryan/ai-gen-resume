import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { TSkillForm } from "../edit-form/skills-form";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";

type TSkillListInputForm = {
    form: UseFormReturn<TSkillForm>;
    index: number;
};

const SkillListInputForm = ({ form, index }: TSkillListInputForm) => {
    const { control } = form;
    const { fields, append, remove } = useFieldArray({
        control,
        name: `skills.${index}.skills`,
    });

    return (
        <div className="space-y-4">
            <FormLabel>Skills</FormLabel>
            {fields.map((field, fieldIndex) => (
                <Input
                    key={field.id}
                    name={`skills.${index}.skills.${fieldIndex}`}
                />
            ))}

            <Button
                variant="secondary"
                type="button"
                onClick={() => append({ text: "" })}
                className="w-full"
            >
                + Add Skill
            </Button>
        </div>
    );
};

export default SkillListInputForm;
