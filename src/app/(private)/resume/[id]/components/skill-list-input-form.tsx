import { useFieldArray, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { TSkillForm } from "../../../../components/edit-form/skills-form";

type TSkillListInputForm = {
	form: UseFormReturn<TSkillForm>;
	index: number;
};

const SkillListInputForm = ({ form, index }: TSkillListInputForm) => {
	const { control, register } = form;
	const { fields, append } = useFieldArray({
		control,
		name: `skills.${index}.skills`,
	});

	return (
		<div className="space-y-4">
			<FormLabel>Skills</FormLabel>
			{fields.map((field, fieldIndex) => (
				<Input key={field.id} {...register(`skills.${index}.skills.${fieldIndex}.text`)} />
			))}

			<Button variant="secondary" type="button" onClick={() => append({ text: "" })} className="w-full">
				+ Add Skill
			</Button>
		</div>
	);
};

export default SkillListInputForm;
