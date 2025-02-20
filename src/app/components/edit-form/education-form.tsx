"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BulletPointsForm } from "./bullet-point-form";
import { TEducation } from "@/lib/types";
import { Form, FormLabel } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";

type TEducationForm = {
    education: (Omit<TEducation, "bulletPoints"> & {
        bulletPoints: { text: string }[];
    })[];
};

export const EducationForm = () => {
    const form = useForm<TEducationForm>({
        defaultValues: {
            education: [],
        },
    });
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "education",
    });

    const onSubmit = (data: TEducationForm) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {fields.map((education, index) => (
                    <Card key={education.id}>
                        <CardContent className="py-4 flex flex-col gap-4">
                            <div>
                                <FormLabel htmlFor="schoolName">
                                    School Name
                                </FormLabel>
                                <Input
                                    id="schoolName"
                                    {...register(
                                        `education.${index}.schoolName`,
                                        {
                                            required: "School Name is required",
                                        }
                                    )}
                                />
                                {errors.education?.[index]?.schoolName && (
                                    <p className="text-red-500 text-sm">
                                        {
                                            errors.education?.[index]
                                                ?.schoolName.message
                                        }
                                    </p>
                                )}
                            </div>

                            <div>
                                <FormLabel htmlFor="degree">Degree</FormLabel>
                                <Input
                                    id="degree"
                                    {...register(`education.${index}.degree`, {
                                        required: "Degree is required",
                                    })}
                                />
                                {errors.education?.[index]?.degree && (
                                    <p className="text-red-500 text-sm">
                                        {
                                            errors.education?.[index]?.degree
                                                .message
                                        }
                                    </p>
                                )}
                            </div>

                            <div>
                                <FormLabel htmlFor="major">Major</FormLabel>
                                <Input
                                    id="major"
                                    {...register(`education.${index}.major`, {
                                        required: "Major is required",
                                    })}
                                />
                                {errors.education?.[index]?.major && (
                                    <p className="text-red-500 text-sm">
                                        {
                                            errors.education?.[index]?.major
                                                .message
                                        }
                                    </p>
                                )}
                            </div>

                            {/* Location */}
                            <div>
                                <FormLabel htmlFor="location">
                                    Location
                                </FormLabel>
                                <Input
                                    id="location"
                                    {...register(
                                        `education.${index}.location`,
                                        {
                                            required: "Location is required",
                                        }
                                    )}
                                />
                                {errors.education?.[index]?.location && (
                                    <p className="text-red-500 text-sm">
                                        {
                                            errors.education?.[index]?.location
                                                .message
                                        }
                                    </p>
                                )}
                            </div>

                            <div>
                                <div className="flex justify-between items-center">
                                    <FormLabel>Bullet Points</FormLabel>
                                </div>

                                <BulletPointsForm
                                    form={form}
                                    name={`education.${index}.bulletPoints`}
                                />
                            </div>

                            <Button
                                variant="destructive"
                                onClick={() => remove(index)}
                            >
                                Remove Education
                            </Button>
                        </CardContent>
                    </Card>
                ))}

                <Button
                    type="button"
                    variant="outline"
                    className="tw-w-max"
                    onClick={() => {
                        append({
                            bulletPoints: [],
                            degree: "",
                            location: "",
                            major: "",
                            schoolName: "",
                        });
                    }}
                >
                    Add Education
                </Button>
                <Button type="submit" className="w-full">
                    Save
                </Button>
            </form>
        </Form>
    );
};

EducationForm.displayName = "Education";

export default EducationForm;
