import { useState } from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { FormItem, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Check, Pencil, Trash } from "lucide-react";

interface BulletPointFormItemProps {
    control: any;
    fieldName: string;
    onRemove: () => void;
}

export function BulletPointFormItem({
    control,
    fieldName,
    onRemove,
}: BulletPointFormItemProps) {
    const [isEditing, setIsEditing] = useState(true); // Single toggle state per item

    return (
        <FormItem className="flex flex-col gap-4 border border-border p-2">
            <FormControl>
                {isEditing ? (
                    <Controller
                        name={fieldName}
                        control={control}
                        render={({ field }) => (
                            <ReactQuill
                                className="tw-w-full"
                                theme="snow"
                                modules={{
                                    toolbar: ["bold", "italic", "link"],
                                }}
                                {...field}
                            />
                        )}
                    />
                ) : (
                    <Controller
                        name={fieldName}
                        control={control}
                        render={({ field }) => <Input readOnly {...field} />}
                    />
                )}
            </FormControl>

            <div className="flex gap-2 items-center">
                {isEditing ? (
                    <Button
                        variant="secondary"
                        onClick={() => setIsEditing(false)}
                    >
                        <Check color="green" />
                    </Button>
                ) : (
                    <Button onClick={() => setIsEditing(true)}>
                        <Pencil />
                    </Button>
                )}
                <Button variant="destructive" onClick={onRemove}>
                    <Trash />
                </Button>
            </div>
        </FormItem>
    );
}
