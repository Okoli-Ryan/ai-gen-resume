import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TPersonalInfo } from "@/lib/types";

export type TPersonalInfoForm = {
    personalInfo: TPersonalInfo;
};

const PersonalInfoForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TPersonalInfoForm>({
        defaultValues: {},
    });

    const onSubmit = (data: TPersonalInfoForm) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    {...register("personalInfo.name", { required: true })}
                />
                {errors?.personalInfo?.name && (
                    <p className="text-red-500 text-sm">Name is required</p>
                )}
            </div>

            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    {...register("personalInfo.email", { required: true })}
                />
                {errors?.personalInfo?.email && (
                    <p className="text-red-500 text-sm">Email is required</p>
                )}
            </div>
            <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                    id="phoneNumber"
                    {...register("personalInfo.phoneNumber", {
                        required: true,
                    })}
                />
            </div>
            <div>
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input id="githubUrl" {...register("personalInfo.githubUrl")} />
            </div>
            <div>
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                    id="linkedinUrl"
                    {...register("personalInfo.linkedinUrl")}
                />
            </div>
            <div>
                <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                <Input
                    id="portfolioUrl"
                    {...register("personalInfo.portfolioUrl")}
                />
            </div>
            <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...register("personalInfo.location")} />
            </div>
            <div>
                <Label htmlFor="role">Role</Label>
                <Input id="role" {...register("personalInfo.role")} />
            </div>
            <Button type="submit" className="w-full">
                Submit
            </Button>
        </form>
    );
};

PersonalInfoForm.displayName = "Personal Info";

export default PersonalInfoForm;
