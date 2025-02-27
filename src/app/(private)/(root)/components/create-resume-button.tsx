"use client";

import { LoaderCircle, Plus } from "lucide-react";
import { useTransition } from "react";
import { createResume } from "../../resume/[id]/actions/create-resume-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateResumeButton = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    function handleCreateResume() {
        startTransition(async () => {
            const response = await createResume();

            if (response.error) {
                toast.error(response.error);
                return;
            }

            router.push(`/resume/${response.data!.id}`);
        });
    }

    return (
        <button
            onClick={handleCreateResume}
            className="p-2 bg-white rounded-full mr-2 hover:bg-gray-400 transition-colors duration-300"
        >
            {isPending ? (
                <LoaderCircle className="size-6 animate-spin"/>
            ) : (
                <Plus className="size-6 text-gray-800" />
            )}
        </button>
    );
};

export default CreateResumeButton;
