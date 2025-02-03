import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export type TWorkExperience = {
  companyName: string;
  companyLink?: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  bulletPoints: string[];
};

const WorkExperienceForm = () => {
  const form = useForm<TWorkExperience>({
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

  const { control, handleSubmit, setValue, watch } = form
 
  const [useQuill, setUseQuill] = useState(false);
  const bulletPoints = watch("bulletPoints") || [];

  const handleBulletPointChange = (value: string) => {
    // Convert newline-separated Quill content into bullet points
    const points = value.split("\n").filter((point) => point.trim() !== "");
    setValue("bulletPoints", points);
  };

  const addBulletPoint = () => {
    setValue("bulletPoints", [...bulletPoints, ""]);
  };

  const onSubmit = (data: TWorkExperience) => {
    console.log("Form Data:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-4">
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
          <Switch checked={useQuill} onCheckedChange={setUseQuill} />
        </div>

        {useQuill ? (
          <FormField
            control={control}
            name="bulletPoints"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Controller
                    name="bulletPoints"
                    control={control}
                    render={() => (
                      <ReactQuill
                        theme="snow"
                        onChange={handleBulletPointChange}
                        value={bulletPoints.join("\n")}
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <ul className="space-y-2">
            {bulletPoints.map((point, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="flex-grow">{point || "New bullet point"}</span>
              </li>
            ))}
          </ul>
        )}

        <Button type="button" onClick={addBulletPoint} className="w-full">
          + Add Bullet Point
        </Button>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}

WorkExperienceForm.displayName = "Work Experience"

export default WorkExperienceForm