"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BulletPointsForm } from "./bullet-point-form";
import { Form, FormLabel } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { ToBulletPointObj, TProject } from "@/lib/types";

export type TProjectForm = {
    projects: ToBulletPointObj<TProject>[];
};

export const ProjectForm = () => {
    const form = useForm<TProjectForm>({
        defaultValues: { projects: [] },
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "projects",
    });

    const onSubmit = (data: TProjectForm) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {fields.map((project, index) => (
                    <Card key={project.id}>
                        <CardContent className="py-4 flex flex-col gap-4">
                            {/* Project Name */}
                            <div>
                                <FormLabel htmlFor={`name-${index}`}>
                                    Project Name
                                </FormLabel>
                                <Input
                                    id={`name-${index}`}
                                    {...register(`projects.${index}.name`, {
                                        required: "Project Name is required",
                                    })}
                                />
                                {errors.projects?.[index]?.name && (
                                    <p className="text-red-500 text-sm">
                                        {errors.projects[index]?.name?.message}
                                    </p>
                                )}
                            </div>

                            {/* Project Link */}
                            <div>
                                <FormLabel htmlFor={`link-${index}`}>
                                    Project Link
                                </FormLabel>
                                <Input
                                    id={`link-${index}`}
                                    {...register(`projects.${index}.link`, {
                                        required: "Project Link is required",
                                        pattern: {
                                            value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
                                            message: "Enter a valid URL",
                                        },
                                    })}
                                />
                                {errors.projects?.[index]?.link && (
                                    <p className="text-red-500 text-sm">
                                        {errors.projects[index]?.link?.message}
                                    </p>
                                )}
                            </div>

                            {/* Bullet Points */}
                            <div>
                                <FormLabel>Bullet Points</FormLabel>
                                <BulletPointsForm
                                    form={form}
                                    name={`projects.${index}.bulletPoints`}
                                />
                            </div>

                            {/* Remove Button */}
                            <Button
                                variant="destructive"
                                onClick={() => remove(index)}
                            >
                                Remove Project
                            </Button>
                        </CardContent>
                    </Card>
                ))}

                {/* Add Project Button */}
                <Button
                    type="button"
                    variant="outline"
                    className="tw-w-max"
                    onClick={() => {
                        append({ name: "", link: "", bulletPoints: [] });
                    }}
                >
                    Add Project
                </Button>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                    Save
                </Button>
            </form>
        </Form>
    );
};

ProjectForm.displayName = "ProjectForm";

export default ProjectForm;
