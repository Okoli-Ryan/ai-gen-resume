import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReactQuill } from "@/components/react-quill";

type FormData = {
  summary: string;
};

const MAX_LENGTH = 1000;

const SummaryForm = () => {
  const form = useForm<FormData>({
    defaultValues: { summary: "" },
  });

  const { control, handleSubmit, watch } = form;

  const summary = watch("summary") || "";

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto space-y-4"
      >
        {/* Summary Field */}
        <FormField
          control={control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Controller
                  name="summary"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      {...field}
                      theme="snow"
                      onChange={(value) => {
                        if (
                          value.replace(/(<([^>]+)>)/gi, "").length <=
                          MAX_LENGTH
                        ) {
                          field.onChange(value);
                        }
                      }}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
              <div className="text-right text-sm text-gray-500">
                {summary.replace(/(<([^>]+)>)/gi, "").length} / {MAX_LENGTH}
              </div>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

SummaryForm.displayName = "Summary"

export default SummaryForm