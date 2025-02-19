import { useFieldArray, useForm } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TWorkExperience } from "@/lib/types";
import { BulletPointsForm } from "../components/bullet-point-form";
import { Card, CardContent } from "@/components/ui/card";

type TWorkExperienceForm = {
    workExperience: (Omit<TWorkExperience, "bulletPoints"> & {
        bulletPoints: { text: string }[];
    })[];
};

const WorkExperienceForm = () => {
    const form = useForm<TWorkExperienceForm>({
        defaultValues: {
            workExperience: [],
        },
    });

    const { control, handleSubmit } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "workExperience",
    });

    const onSubmit = (data: TWorkExperienceForm) => {
        console.log("Form Data:", data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                {fields.map((experience, index) => (
                    <Card key={experience.id}>
                        <CardContent className="py-4 flex flex-col gap-4">
                            <FormField
                                control={control}
                                name={`workExperience.${index}.companyName`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name={`workExperience.${index}.companyLink`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Link</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name={`workExperience.${index}.title`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name={`workExperience.${index}.startDate`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name={`workExperience.${index}.endDate`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name={`workExperience.${index}.location`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Bullet Points Section */}
                            <div className="flex justify-between items-center">
                                <FormLabel>Bullet Points</FormLabel>
                            </div>

                            <BulletPointsForm
                                form={form}
                                name={`workExperience.${index}.bulletPoints`}
                            />

                            <Button
                                variant="destructive"
                                onClick={() => remove(index)}
                            >
                                Remove Experience
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
                            companyName: "",
                            endDate: "",
                            location: "",
                            startDate: "",
                            title: "",
                            companyLink: "",
                            bulletPoints: [],
                        });
                    }}
                >
                    Add Experience
                </Button>

                <Button type="submit" className="w-full">
                    Save
                </Button>
            </form>
        </Form>
    );
};

WorkExperienceForm.displayName = "Work Experience";

export default WorkExperienceForm;
