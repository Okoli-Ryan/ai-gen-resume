import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TPersonalInfo } from "@/lib/types";
import React from "react";
import { useForm } from "react-hook-form";

const PersonalInfoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPersonalInfo & {firstname: string, lastname: string}>({
    defaultValues: {
      firstname: "Ugochukwu",
      lastname: "Okoli",
      email: "okoliryan50@gmail",
      phoneNumber: "+2347025939563",
      githubUrl: "https://github.com/okoliryan50",
      linkedinUrl: "https://linkedin.com/in/okoliryan50",
      portfolioUrl: "https://okoliryan50.vercel.app",
      location: "Lagos, Nigeria",
      title: "Frontend Developer",
    },
  });

  const onSubmit = (data: TPersonalInfo & {firstname: string, lastname: string}) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="firstname">First Name</Label>
        <Input id="firstname" {...register("firstname", { required: true })} />
        {errors.firstname && (
          <p className="text-red-500 text-sm">First name is required</p>
        )}
      </div>
      <div>
        <Label htmlFor="lastname">Last Name</Label>
        <Input id="lastname" {...register("lastname", { required: true })} />
        {errors.lastname && (
          <p className="text-red-500 text-sm">Last name is required</p>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">Email is required</p>
        )}
      </div>
      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          {...register("phoneNumber", { required: true })}
        />
      </div>
      <div>
        <Label htmlFor="githubUrl">GitHub URL</Label>
        <Input id="githubUrl" {...register("githubUrl")} />
      </div>
      <div>
        <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
        <Input id="linkedinUrl" {...register("linkedinUrl")} />
      </div>
      <div>
        <Label htmlFor="portfolioUrl">Portfolio URL</Label>
        <Input id="portfolioUrl" {...register("portfolioUrl")} />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" {...register("location")} />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} />
      </div>
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};

PersonalInfoForm.displayName = "Personal Info"

export default PersonalInfoForm;
