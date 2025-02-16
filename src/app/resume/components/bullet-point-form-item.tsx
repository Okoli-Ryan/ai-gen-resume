import { Check, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { ReactQuill } from "@/components/react-quill";
import { Button } from "@/components/ui/button";
import { FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface BulletPointFormItemProps<T extends FieldValues> {
	control: Control<T>;
	fieldName: Path<T>;
	onRemove: () => void;
}

export function BulletPointFormItem<T extends FieldValues>({ control, fieldName, onRemove }: BulletPointFormItemProps<T>) {
	const [isEditing, setIsEditing] = useState(true); // Single toggle state per item

	return (
		<FormItem className="flex flex-col gap-4">
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
					<Controller name={fieldName} control={control} render={({ field }) => <Input readOnly {...field} />} />
				)}
			</FormControl>

			<div className="flex gap-2 items-center">
				{isEditing ? (
					<Button variant="secondary" onClick={() => setIsEditing(false)}>
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
