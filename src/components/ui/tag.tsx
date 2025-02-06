import { useState, useRef } from "react";
import { XIcon } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { useClickAway } from "@/hooks/use-click-away";

type TagProps = {
    value: string;
    onUpdate: (val: string) => void;
    onRemove: () => void;
};

const Tag = ({ onRemove, onUpdate, value }: TagProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Close input on click outside
    useClickAway(wrapperRef, () => {
        if (isEditing) handleUpdate();
    });

    const handleUpdate = () => {
        if (inputValue.trim()) {
            onUpdate(inputValue);
        } else {
            setInputValue(value);
        }
        setIsEditing(false);
    };

    return (
        <div ref={wrapperRef} className="mt-2 flex flex-wrap gap-2">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-medium flex items-center gap-2">
                {isEditing ? (
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleUpdate}
                        autoFocus
                        className="w-24 text-sm px-2 py-0.5 bg-transparent border-none focus:ring-0"
                    />
                ) : (
                    <span
                        onClick={() => setIsEditing(true)}
                        className="cursor-pointer"
                    >
                        {value}
                    </span>
                )}

                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-50"
                >
                    <button onClick={onRemove}>
                        <XIcon className="h-4 w-4" />
                    </button>
                    <span className="sr-only">Remove tag</span>
                </Button>
            </div>
        </div>
    );
};

export default Tag;
