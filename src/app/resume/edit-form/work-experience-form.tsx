import { useForm } from "react-hook-form";
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

type TWorkExperienceForm = Omit<TWorkExperience, "bulletPoints"> & {bulletPoints: {text: string}[]}

const WorkExperienceForm = () => {
    const form = useForm<TWorkExperienceForm>({
        defaultValues: {
            companyName: "",
            companyLink: "",
            title: "",
            startDate: "",
            endDate: "",
            location: "",
            bulletPoints: [],
        },
    });

    const { control, handleSubmit } = form;

    const onSubmit = (data: TWorkExperienceForm) => {
        console.log("Form Data:", data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-xl mx-auto space-y-4"
            >
                {/* Basic Fields */}
                <FormField
                    control={control}
                    name="companyName"
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
                    name="companyLink"
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
                    name="title"
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
                    name="startDate"
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
                    name="endDate"
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
                    name="location"
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

                <BulletPointsForm form={form} name="bulletPoints" />

                <Button type="submit" className="w-full">
                    Submit
                </Button>
            </form>
        </Form>
    );
};

WorkExperienceForm.displayName = "Work Experience";

export default WorkExperienceForm;
