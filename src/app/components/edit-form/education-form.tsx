"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BulletPointsForm } from "./bullet-point-form";
import { TEducation, ToBulletPointObj } from "@/lib/types";
import { Form, FormLabel } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export type TEducationForm = {
    education: ToBulletPointObj<TEducation>[];
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
                                <FormLabel htmlFor="startDate">
                                    Start Date
                                </FormLabel>
                                <Input
                                    type="date"
                                    {...register(
                                        `education.${index}.startDate`,
                                        { required: "Start Date is required" }
                                    )}
                                />
                                {errors.education?.[index]?.startDate && (
                                    <p className="text-red-500 text-sm">
                                        {
                                            errors.education?.[index]?.startDate
                                                .message
                                        }
                                    </p>
                                )}
                            </div>

                            <div>
                                <FormLabel htmlFor="endDate">
                                    End Date
                                </FormLabel>
                                <Input
                                    type="date"
                                    {...register(`education.${index}.endDate`, {
                                        required: "End Date is required",
                                    })}
                                />
                                {errors.education?.[index]?.endDate && (
                                    <p className="text-red-500 text-sm">
                                        {
                                            errors.education?.[index]?.endDate
                                                .message
                                        }
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2 mt-2">
                                <Checkbox
                                    id={`isOngoing-${index}`}
                                    {...register(
                                        `education.${index}.isOngoing`
                                    )}
                                />
                                <label
                                    htmlFor={`isOngoing-${index}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Currently Studying
                                </label>
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
                            startDate: "",
                            isOngoing: false,
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
