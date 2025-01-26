"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  segment: z.string(),
  isTeam: z.boolean(),
  applicant_name: z.string().nonempty(),
  applicant_email: z.string().nonempty(),
  applicant_phone: z.string().nonempty(),
  applicant_institution: z.string().nonempty(),
  applicant_student_id: z.string().nonempty(),
  applicant_session: z.string().nonempty(),
  applicant_tshirt: z.string().nonempty(),
});

const segments = [
  { id: 1, name: "Segment 1", participation_type: "team" },
  { id: 2, name: "Segment 2", participation_type: "solo" },
  { id: 3, name: "Segment 3", participation_type: "team" },
];

const tshirt_sizes = [
  { id: 1, name: "S" },
  { id: 2, name: "M" },
  { id: 3, name: "L" },
  { id: 4, name: "XL" },
  { id: 5, name: "XXL" },
];

const TeamForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      segment: "",
      isTeam: false,
      applicant_name: "",
      applicant_email: "",
      applicant_phone: "",
      applicant_institution: "",
      applicant_student_id: "",
      applicant_session: "",
      applicant_tshirt: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container mx-auto px-5 lg:px-20 min-h-screen p-5"
        >
          <div>
            <h1 className="text-3xl font-bold mt-20 mb-8">Register</h1>
          </div>

          <FormField
            control={form.control}
            name="segment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Segments</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Competition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Segments</SelectLabel>
                      {segments.map((segment) => (
                        <SelectItem key={segment.id} value={segment.name}>
                          {segment.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Some segments are solo, some are team based.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("segment") != "" && (
            <>
              <Separator className="my-10" />
              <p>
                Registering for{" "}
                {segments
                  .filter((item) => item.name == form.watch("segment"))[0]
                  .participation_type.toUpperCase()}{" "}
                Competition
              </p>

              <div className="flex items-end gap-5 mt-10">
                <FormField
                  control={form.control}
                  name="applicant_name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Applicant Name</FormLabel>
                      <Input {...field} />
                      <FormDescription>
                        <FormDescription>
                          {form.formState.errors.applicant_name?.message}
                        </FormDescription>{" "}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="applicant_tshirt"
                  render={({ field }) => (
                    <FormItem className="w-1/4">
                      <FormLabel>T-Shirt size</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Segments</SelectLabel>
                            {tshirt_sizes.map((size) => (
                              <SelectItem key={size.id} value={size.name}>
                                {size.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        {form.formState.errors.applicant_name?.message}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex w-full gap-5">
                <FormField
                  control={form.control}
                  name="applicant_email"
                  render={({ field }) => (
                    <FormItem className="mt-5 flex-1">
                      <FormLabel>Email</FormLabel>
                      <Input type="email" {...field} />
                      <FormDescription>
                        {form.formState.errors.applicant_email?.message}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicant_phone"
                  render={({ field }) => (
                    <FormItem className="mt-5 flex-1">
                      <FormLabel>Phone</FormLabel>
                      <Input type="tel" {...field} />
                      <FormDescription>
                        {form.formState.errors.applicant_phone?.message}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="applicant_institution"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel>Institution</FormLabel>
                    <Input {...field} />
                    <FormDescription>
                      <FormDescription>
                        {form.formState.errors.applicant_institution?.message}
                      </FormDescription>{" "}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full gap-5">
                <FormField
                  control={form.control}
                  name="applicant_student_id"
                  render={({ field }) => (
                    <FormItem className="mt-5 flex-1">
                      <FormLabel>Student Id</FormLabel>
                      <Input type="email" {...field} />
                      <FormDescription>
                        {form.formState.errors.applicant_student_id?.message}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicant_session"
                  render={({ field }) => (
                    <FormItem className="mt-5 flex-1">
                      <FormLabel>Session</FormLabel>
                      <Input type="tel" {...field} />
                      <FormDescription>
                        {form.formState.errors.applicant_session?.message}
                      </FormDescription>
                      <FormDescription>Semester, class</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          {/* {segments.filter(item => item.name == participat form.watch("segment"))[0].participation_type != "team" && (
            <>
              <Separator className="my-10" />
              <p>Team Members</p>
            </>
          )} */}

          <FormItem className="mt-10">
            <Button type="submit">Submit</Button>
          </FormItem>
        </form>
      </div>
    </Form>
  );
};

export default TeamForm;
