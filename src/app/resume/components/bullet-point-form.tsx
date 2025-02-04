import { ArrayPath, FieldArray, FieldValues, Path, useFieldArray, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { BulletPointFormItem } from "./bullet-point-form-item";

interface BulletPointsFormProps<T extends FieldValues>{
  form: UseFormReturn<T, ArrayPath<T>, undefined>;
  name: ArrayPath<T>
}

export function BulletPointsForm<T extends FieldValues>({ form, name }: BulletPointsFormProps<T>) {
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <BulletPointFormItem
          key={field.id}
          control={control}
          fieldName={`bulletPoints.${index}`}
          onRemove={() => remove(index)}
        />
      ))}

      <Button type="button" onClick={() => append({} as FieldArray<T>)} className="w-full">
        + Add Bullet Point
      </Button>
    </div>
  );
}
