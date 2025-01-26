"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  segment: z.string(),
  isTeam: z.boolean(),
  applicant_name: z.string().nonempty(),
  applicant_email: z.string().email().nonempty(),
  applicant_phone: z.string().nonempty(),
  applicant_institution: z.string().nonempty(),
  applicant_student_id: z.string().nonempty(),
  applicant_session: z.string().nonempty(),
  applicant_tshirt: z.string().nonempty(),
  payment_method: z.string().nonempty(),
  transaction_id: z.string().nonempty(),
  team_name: z.string().nonempty(),

  team_member_1_name: z.string(),
  team_member_1_email: z.string().email(),
  team_member_1_phone: z.string(),
  team_member_1_institution: z.string(),
  team_member_1_student_id: z.string(),
  team_member_1_session: z.string(),
  team_member_1_tshirt: z.string(),

  team_member_2_name: z.string(),
  team_member_2_email: z.string().email(),
  team_member_2_phone: z.string(),
  team_member_2_institution: z.string(),
  team_member_2_student_id: z.string(),
  team_member_2_session: z.string(),
  team_member_2_tshirt: z.string(),

  team_member_3_name: z.string(),
  team_member_3_email: z.string().email(),
  team_member_3_phone: z.string(),
  team_member_3_institution: z.string(),
  team_member_3_student_id: z.string(),
  team_member_3_session: z.string(),
  team_member_3_tshirt: z.string(),

  team_member_4_name: z.string(),
  team_member_4_email: z.string().email(),
  team_member_4_phone: z.string(),
  team_member_4_institution: z.string(),
  team_member_4_student_id: z.string(),
  team_member_4_session: z.string(),
  team_member_4_tshirt: z.string(),
});

const segments = [
  { id: 0, name: "", participation_type: "solo" },
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
      team_name: "",
      payment_method: "",
      transaction_id: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const [teamMembers, setTeamMembers] = React.useState(0);

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
                      {segments
                        .filter((item) => item.id != 0)
                        .map((segment) => (
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

              <div className="flex items-start gap-5 mt-10">
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

          {segments.filter((item) => item.name == form.watch("segment"))[0]
            .participation_type == "team" && (
            <>
              <Separator className="my-10" />
              <p>Team ({teamMembers} / 4)</p>
              <p className="text-gray-500">
                <small>
                  You can add 4 additional members. Total 5 members including
                  you.
                </small>
              </p>
              <div className="w-full mt-5">
                <FormField
                  control={form.control}
                  name="team_name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Team Name</FormLabel>
                      <Input {...field} />
                      <FormDescription>
                        {form.formState.errors.team_name?.message}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-5 flex gap-5">
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (teamMembers < 4) {
                        const tm = teamMembers + 1;
                        setTeamMembers(tm);
                      }
                    }}
                  >
                    Add Member
                  </Button>

                  <Button
                    type="button"
                    variant={"destructive"}
                    onClick={(e) => {
                      e.preventDefault();
                      if (teamMembers > 0) {
                        const tm = teamMembers - 1;
                        setTeamMembers(tm);
                      }
                    }}
                  >
                    Remove Member
                  </Button>
                </div>

                <div className="flex flex-col gap-5 mt-5">
                  {teamMembers > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {form.watch("team_member_1_name") == ""
                            ? `Team Member ${1}`
                            : `Team Member: ${form.watch(
                                "team_member_1_name"
                              )}`}
                        </CardTitle>
                        <CardDescription>
                          Deploy your new project in one-click.
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="flex gap-10">
                          <FormField
                            control={form.control}
                            name="team_member_1_name"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Applicant Name</FormLabel>
                                <Input {...field} />
                                <FormDescription>
                                  <FormDescription>
                                    {
                                      form.formState.errors.team_member_1_name
                                        ?.message
                                    }
                                  </FormDescription>{" "}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="team_member_1_tshirt"
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
                                        <SelectItem
                                          key={size.id}
                                          value={size.name}
                                        >
                                          {size.name}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  {
                                    form.formState.errors.applicant_name
                                      ?.message
                                  }
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex gap-5">
                          <FormField
                            control={form.control}
                            name="team_member_1_email"
                            render={({ field }) => (
                              <FormItem className="flex-1 mt-5">
                                <FormLabel>Applicant Email</FormLabel>
                                <Input {...field} />
                                <FormDescription>
                                  <FormDescription>
                                    {
                                      form.formState.errors.team_member_1_name
                                        ?.message
                                    }
                                  </FormDescription>{" "}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="team_member_1_phone"
                            render={({ field }) => (
                              <FormItem className="flex-1 mt-5">
                                <FormLabel>Applicant Phone</FormLabel>
                                <Input {...field} />
                                <FormDescription>
                                  <FormDescription>
                                    {
                                      form.formState.errors.team_member_1_name
                                        ?.message
                                    }
                                  </FormDescription>{" "}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex gap-3">
                          <FormField
                            control={form.control}
                            name="team_member_1_institution"
                            render={({ field }) => (
                              <FormItem className="mt-5">
                                <FormLabel>Institution</FormLabel>
                                <Input {...field} />
                                <FormDescription>
                                  <FormDescription>
                                    {
                                      form.formState.errors
                                        .team_member_1_institution?.message
                                    }
                                  </FormDescription>{" "}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="team_member_1_student_id"
                            render={({ field }) => (
                              <FormItem className="mt-5 flex-1">
                                <FormLabel>Student Id</FormLabel>
                                <Input type="email" {...field} />
                                <FormDescription>
                                  {
                                    form.formState.errors
                                      .team_member_1_student_id?.message
                                  }
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="team_member_1_session"
                            render={({ field }) => (
                              <FormItem className="mt-5 flex-1">
                                <FormLabel>Session</FormLabel>
                                <Input type="tel" {...field} />
                                <FormDescription>
                                  {
                                    form.formState.errors.team_member_1_session
                                      ?.message
                                  }
                                </FormDescription>
                                <FormDescription>
                                  Semester, class
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button>Deploy</Button>
                      </CardFooter>
                    </Card>
                  )}

                  {teamMembers > 1 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {form.watch("team_member_2_name") == ""
                            ? `Team Member ${1}`
                            : `Team Member: ${form.watch(
                                "team_member_2_name"
                              )}`}
                        </CardTitle>
                        <CardDescription>
                          Deploy your new project in one-click.
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="flex gap-10">
                          <FormField
                            control={form.control}
                            name="team_member_2_name"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Applicant Name</FormLabel>
                                <Input {...field} />
                                <FormDescription>
                                  <FormDescription>
                                    {
                                      form.formState.errors.team_member_1_name
                                        ?.message
                                    }
                                  </FormDescription>{" "}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="team_member_2_tshirt"
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
                                        <SelectItem
                                          key={size.id}
                                          value={size.name}
                                        >
                                          {size.name}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  {
                                    form.formState.errors.applicant_name
                                      ?.message
                                  }
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex gap-5">
                          <FormField
                            control={form.control}
                            name="team_member_2_email"
                            render={({ field }) => (
                              <FormItem className="flex-1 mt-5">
                                <FormLabel>Applicant Email</FormLabel>
                                <Input {...field} />
                                <FormDescription>
                                  <FormDescription>
                                    {
                                      form.formState.errors.team_member_2_name
                                        ?.message
                                    }
                                  </FormDescription>{" "}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="team_member_2_phone"
                            render={({ field }) => (
                              <FormItem className="flex-1 mt-5">
                                <FormLabel>Applicant Phone</FormLabel>
                                <Input {...field} />
                                <FormDescription>
                                  <FormDescription>
                                    {
                                      form.formState.errors.team_member_2_name
                                        ?.message
                                    }
                                  </FormDescription>{" "}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex gap-3">
                          <FormField
                            control={form.control}
                            name="team_member_2_institution"
                            render={({ field }) => (
                              <FormItem className="mt-5">
                                <FormLabel>Institution</FormLabel>
                                <Input {...field} />
                                <FormDescription>
                                  <FormDescription>
                                    {
                                      form.formState.errors
                                        .team_member_2_institution?.message
                                    }
                                  </FormDescription>{" "}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="team_member_2_student_id"
                            render={({ field }) => (
                              <FormItem className="mt-5 flex-1">
                                <FormLabel>Student Id</FormLabel>
                                <Input type="email" {...field} />
                                <FormDescription>
                                  {
                                    form.formState.errors
                                      .team_member_2_student_id?.message
                                  }
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="team_member_2_session"
                            render={({ field }) => (
                              <FormItem className="mt-5 flex-1">
                                <FormLabel>Session</FormLabel>
                                <Input type="tel" {...field} />
                                <FormDescription>
                                  {
                                    form.formState.errors.team_member_2_session
                                      ?.message
                                  }
                                </FormDescription>
                                <FormDescription>
                                  Semester, class
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button>Deploy</Button>
                      </CardFooter>
                    </Card>
                  )}

                  {teamMembers > 2 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {form.watch("team_member_3_name") == ""
                            ? `Team Member ${1}`
                            : `Team Member: ${form.watch(
                                "team_member_3_name"
                              )}`}
                        </CardTitle>
                        <CardDescription>
                          Deploy your new project in one-click.
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="flex gap-10">
                          <FormField
                            control={form.control}
                            name="team_member_3_name"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Applicant Name</FormLabel>
                                <Input {...field} />
                                <FormDescription>
                                  <FormDescription>
                                    {
                                      form.formState.errors.team_member_1_name
                                        ?.message
                                    }
                                  </FormDescription>{" "}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="team_member_3_tshirt"
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
                                        <SelectItem
                                          key={size.id}
                                          value={size.name}
                                        >
                                          {size.name}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  {
                                    form.formState.errors.applicant_name
                                      ?.message
                                  }
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex gap-5">
                          <FormField
                            control={form.control}
                            name="team_member_3_email"
                            render={({ field }) => (
                              <FormItem className="flex-1 mt-5">
                                <FormLabel>Applicant Email</FormLabel>
                                <Input {...field} />
                                <FormDescription>
                                  <FormDescription>
                                    {
                                      form.formState.errors.team_member_3_name
                                        ?.message
                                    }
                                  </FormDescription>{" "}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="team_member_3_phone"
                            render={({ field }) => (
                              <FormItem className="flex-1 mt-5">
                                <FormLabel>Applicant Phone</FormLabel>
                                <Input {...field} />
                                <FormDescription>
                                  <FormDescription>
                                    {
                                      form.formState.errors.team_member_3_name
                                        ?.message
                                    }
                                  </FormDescription>{" "}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex gap-3">
                          <FormField
                            control={form.control}
                            name="team_member_3_institution"
                            render={({ field }) => (
                              <FormItem className="mt-5">
                                <FormLabel>Institution</FormLabel>
                                <Input {...field} />
                                <FormDescription>
                                  <FormDescription>
                                    {
                                      form.formState.errors
                                        .team_member_3_institution?.message
                                    }
                                  </FormDescription>{" "}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="team_member_3_student_id"
                            render={({ field }) => (
                              <FormItem className="mt-5 flex-1">
                                <FormLabel>Student Id</FormLabel>
                                <Input type="email" {...field} />
                                <FormDescription>
                                  {
                                    form.formState.errors
                                      .team_member_3_student_id?.message
                                  }
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="team_member_3_session"
                            render={({ field }) => (
                              <FormItem className="mt-5 flex-1">
                                <FormLabel>Session</FormLabel>
                                <Input type="tel" {...field} />
                                <FormDescription>
                                  {
                                    form.formState.errors.team_member_3_session
                                      ?.message
                                  }
                                </FormDescription>
                                <FormDescription>
                                  Semester, class
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button>Deploy</Button>
                      </CardFooter>
                    </Card>
                  )}
                </div>
              </div>
            </>
          )}

          {form.watch("segment") != "" && (
            <>
              <Separator className="my-10" />
              <p>Payment</p>
              <div className="flex w-full gap-5 items-start mt-5">
                <FormField
                  control={form.control}
                  name="payment_method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Segments</SelectLabel>
                            {[
                              {
                                id: 1,
                                name: "Bkash",
                              },
                              {
                                id: 2,
                                name: "Nagad",
                              },
                              {
                                id: 3,
                                name: "Rocket",
                              },
                            ].map((segment) => (
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

                <FormField
                  control={form.control}
                  name="transaction_id"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Transaction Id or Phone Number</FormLabel>
                      <Input type="text" {...field} />
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

          <FormItem className="mt-10">
            <Button type="submit">Submit</Button>
          </FormItem>
        </form>
      </div>
    </Form>
  );
};

export default TeamForm;
