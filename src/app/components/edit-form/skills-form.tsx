import { Fragment } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import SkillListInputForm from "../../(private)/resume/components/skill-list-input-form";

export type TSkillForm = {
	skills: {
		category: string;
		skills: { text: string }[];
	}[];
};

const SkillsForm = () => {
	const form = useForm<TSkillForm>({
		defaultValues: { skills: [] },
	});

	const { handleSubmit, control, register } = form;

	const { fields, append, remove } = useFieldArray({
		control,
		name: "skills",
	});

	function onSubmit(data: TSkillForm) {
		console.log(data);
	}

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{fields.map((skill, index) => (
					<Fragment key={skill.id}>
						<Card>
							<CardContent className="py-4 flex flex-col gap-4">
								<div>
									<FormLabel htmlFor={`${skill.category}${index}`}>Category</FormLabel>
									<Input
										id={`${skill.category}${index}`}
										{...register(`skills.${index}.category`, {
											required: "Category is required",
										})}
									/>
								</div>

								<SkillListInputForm form={form} index={index} />
							</CardContent>
						</Card>

						<Button variant="destructive" onClick={() => remove(index)}>
							Remove Skill Category
						</Button>
					</Fragment>
				))}

				<Button
					type="button"
					variant="outline"
					className="tw-w-max"
					onClick={() => {
						append({ category: "", skills: [] });
					}}>
					Add Skill Category
				</Button>
				<Button type="submit" className="w-full">
					Save
				</Button>
			</form>
		</Form>
	);
};

SkillsForm.displayName = "Skills";

export default SkillsForm;
