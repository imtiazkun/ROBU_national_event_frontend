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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";
import Image from "next/image";
import Clock from "@/components/Clock";

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
  team_name: z.string(),

  team_member_1_name: z.string().optional(),
  team_member_1_email: z.string().email().optional(),
  team_member_1_phone: z.string().optional(),
  team_member_1_institution: z.string().optional(),
  team_member_1_student_id: z.string().optional(),
  team_member_1_session: z.string().optional(),
  team_member_1_tshirt: z.string().optional(),

  team_member_2_name: z.string().optional(),
  team_member_2_email: z.string().email().optional(),
  team_member_2_phone: z.string().optional(),
  team_member_2_institution: z.string().optional(),
  team_member_2_student_id: z.string().optional(),
  team_member_2_session: z.string().optional(),
  team_member_2_tshirt: z.string().optional(),

  team_member_3_name: z.string().optional(),
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
  { id: 1, name: "Robo-Strikers", participation_type: "team" },
  { id: 2, name: "Mechna-Sprint", participation_type: "team" },
  { id: 3, name: "Pathfinder", participation_type: "team" },
  { id: 4, name: "Aqua-Wars", participation_type: "team" },
  { id: 5, name: "Prompt-Engineering", participation_type: "solo" },
  { id: 6, name: "Innovator's Exhibit", participation_type: "team" },
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

      team_member_1_name: "",
      team_member_1_email: "someone@example.com",
      team_member_1_phone: "",
      team_member_1_institution: "",
      team_member_1_student_id: "",
      team_member_1_session: "",
      team_member_1_tshirt: "",
      team_member_2_name: "",
      team_member_2_email: "someone@example.com",
      team_member_2_phone: "",
      team_member_2_institution: "",
      team_member_2_student_id: "",
      team_member_2_session: "",
      team_member_2_tshirt: "",
      team_member_3_name: "",
      team_member_3_email: "someone@example.com",

      team_member_3_phone: "",
      team_member_3_institution: "",
      team_member_3_student_id: "",
      team_member_3_session: "",
      team_member_3_tshirt: "",
      team_member_4_name: "",
      team_member_4_email: "someone@example.com",
      team_member_4_phone: "",
      team_member_4_institution: "",
      team_member_4_student_id: "",
      team_member_4_session: "",
      team_member_4_tshirt: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    values.isTeam =
      segments.filter((item) => item.name == values.segment)[0]
        .participation_type == "team";

    if (values.isTeam == true && values.team_name == "") {
      toast.error("Team name is required");
      form.setError("team_name", {
        type: "required",
        message: "Team name is required",
      });

      return;
    }

    fetch("http://bracurobu.com:6969/registrations", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        team_name: values.team_name,
        segment: values.segment,
        isTeam: values.isTeam,
        method: values.payment_method,
        trx_id: values.transaction_id,
        applicants: [
          {
            name: values.applicant_name,
            email: values.applicant_email,
            phone: values.applicant_phone,
            institution: values.applicant_institution,
            student_id: values.applicant_student_id,
            session: values.applicant_session,
            tshirt: values.applicant_tshirt,
          },
          {
            name: values.team_member_1_name,
            email: values.team_member_1_email,
            phone: values.team_member_1_phone,
            institution: values.team_member_1_institution,
            student_id: values.team_member_1_student_id,
            session: values.team_member_1_session,
            tshirt: values.team_member_1_tshirt,
          },
          {
            name: values.team_member_2_name,
            email: values.team_member_2_email,
            phone: values.team_member_2_phone,
            institution: values.team_member_2_institution,
            student_id: values.team_member_2_student_id,
            session: values.team_member_2_session,
            tshirt: values.team_member_2_tshirt,
          },
          {
            name: values.team_member_3_name,
            email: values.team_member_3_email,
            phone: values.team_member_3_phone,
            institution: values.team_member_3_institution,
            student_id: values.team_member_3_student_id,
            session: values.team_member_3_session,
            tshirt: values.team_member_3_tshirt,
          },
          {
            name: values.team_member_4_name,
            email: values.team_member_4_email,
            phone: values.team_member_4_phone,
            institution: values.team_member_4_institution,
            student_id: values.team_member_4_student_id,
            session: values.team_member_4_session,
            tshirt: values.team_member_4_tshirt,
          },
        ],
      }),
    })
      .then((res) => {
        if (res.status != 200) {
          toast.error("Failed to register. Try again later.");
          return;
        }
        return res.json();
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((data) => {
        toast.success("Registration successful");
      });
  }

  const [teamMembers, setTeamMembers] = React.useState(0);

  return (
    <Form {...form}>
      <div className="h-auto min-h-screen w-full overflow-hidden">
        <div className="w-full min-h-screen relative bg-bottom">
          <div className="flex items-center flex-col lg:flex-row justify-center gap-10 container mx-auto px-5 lg:px-20 ">
            <div className="flex-1 md:py-10">
              <Image
                width={800}
                height={600}
                src="/banner.png"
                alt=""
                className="w-full"
              />
            </div>
            <div className="flex-1 text-white">
              {/* <p >00: 23 : 51</p> */}
              <Clock />
              <p className="text-right text-2xl mb-5">
                <small className="font-bold code">Remaining for Registration</small>
              </p>
              <p className="text-justify text-xl">
                Rose from the pits of hell, rise shall we again. With the
                forthcoming advent of Traction অভ্যুদয়, we, the Robotics Club
                of BRAC University, celebrate the revolution with yet another
                platform for you to channel the revolutionary in you.
              </p>
            </div>
          </div>
          <div className="flex-1 hidden lg:flex items-center justify-center relative select-none">
            <Image
              width={1472}
              height={832}
              src="/astronaut.png"
              alt=""
              className="object-contain absolute -top-14 up levitate"
            />
          </div>

          <div
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(69,22,189,1) 36%, rgba(211,117,255,1) 100%)",
            }}
            className="absolute top-0 left-0 w-full h-full p-5 -z-10"
          >
            <Image
              width={1600}
              height={900}
              src={"/noise.png"}
              alt="noisy background"
              className="absolute top-0 left-0 w-full h-full "
            />
          </div>
        </div>
      </div>
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
                  // onValueChange={(e) => {
                  //   console.log(field);
                  //   form.setValue("isTeam", segments.filter(_ => _.name == field.value)[0].participation_type == "team");
                  //   field.onChange(e);
                  // }}
                  onValueChange={(e) => {
                    console.log(field);
                    field.onChange(e);
                  }}
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
                    <FormItem className="w-2/5 lg:w-1/4">
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
                      <Input type="text" {...field} />
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
                          {form.watch("team_member_1_name") == undefined
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
                              <FormItem className="w-2/5 lg:w-1/4">
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
                                      form.formState.errors.team_member_1_email
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
                                      form.formState.errors.team_member_1_phone
                                        ?.message
                                    }
                                  </FormDescription>{" "}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex gap-1 justify-between lg:gap-3 flex-wrap lg:flex-nowrap">
                          <FormField
                            control={form.control}
                            name="team_member_1_institution"
                            render={({ field }) => (
                              <FormItem className="mt-5 w-full lg:w-1/3">
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
                              <FormItem className="mt-5 w-6/12 lg:w-1/3">
                                <FormLabel>Student Id</FormLabel>
                                <Input type="text" {...field} />
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
                              <FormItem className="mt-5 w-5/12 lg:w-1/3">
                                <FormLabel>Session</FormLabel>
                                <Input type="text" {...field} />
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
                    </Card>
                  )}

                  {teamMembers > 1 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {form.watch("team_member_2_name") == undefined
                            ? `Team Member ${2}`
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
                            name="team_member_2_tshirt"
                            render={({ field }) => (
                              <FormItem className="w-1/2 lg:w-1/4">
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
                                    form.formState.errors.team_member_2_tshirt
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
                                      form.formState.errors.team_member_2_email
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
                                      form.formState.errors.team_member_2_phone
                                        ?.message
                                    }
                                  </FormDescription>{" "}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex gap-1 justify-between lg:gap-3 flex-wrap lg:flex-nowrap">
                          <FormField
                            control={form.control}
                            name="team_member_2_institution"
                            render={({ field }) => (
                              <FormItem className="mt-5 w-full lg:w-1/3">
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
                              <FormItem className="mt-5 w-6/12 lg:flex-1">
                                <FormLabel>Student Id</FormLabel>
                                <Input type="text" {...field} />
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
                              <FormItem className="mt-5 w-5/12 lg:flex-1">
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
                    </Card>
                  )}

                  {teamMembers > 2 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {form.watch("team_member_3_name") == undefined
                            ? `Team Member ${3}`
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
                            name="team_member_3_tshirt"
                            render={({ field }) => (
                              <FormItem className="w-1/2 lg:w-1/4">
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
                                    form.formState.errors.team_member_3_tshirt
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
                                      form.formState.errors.team_member_3_email
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
                                      form.formState.errors.team_member_3_phone
                                        ?.message
                                    }
                                  </FormDescription>{" "}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex gap-1 justify-between lg:gap-3 flex-wrap lg:flex-nowrap">
                          <FormField
                            control={form.control}
                            name="team_member_3_institution"
                            render={({ field }) => (
                              <FormItem className="mt-5 w-full lg:w-1/3">
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
                              <FormItem className="mt-5 w-6/12 lg:flex-1">
                                <FormLabel>Student Id</FormLabel>
                                <Input type="text" {...field} />
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
                              <FormItem className="mt-5 w-5/12 lg:flex-1">
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
                    </Card>
                  )}

                  {teamMembers > 3 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {form.watch("team_member_4_name") == undefined
                            ? `Team Member ${4}`
                            : `Team Member: ${form.watch(
                                "team_member_4_name"
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
                            name="team_member_4_name"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Applicant Name</FormLabel>
                                <Input {...field} />
                                <FormDescription>
                                  <FormDescription>
                                    {
                                      form.formState.errors.team_member_4_name
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
                            name="team_member_4_tshirt"
                            render={({ field }) => (
                              <FormItem className="w-1/2 lg:w-1/4">
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
                                    form.formState.errors.team_member_4_tshirt
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
                            name="team_member_4_email"
                            render={({ field }) => (
                              <FormItem className="flex-1 mt-5">
                                <FormLabel>Applicant Email</FormLabel>
                                <Input {...field} />
                                <FormDescription>
                                  <FormDescription>
                                    {
                                      form.formState.errors.team_member_4_email
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
                            name="team_member_4_phone"
                            render={({ field }) => (
                              <FormItem className="flex-1 mt-5">
                                <FormLabel>Applicant Phone</FormLabel>
                                <Input {...field} />
                                <FormDescription>
                                  <FormDescription>
                                    {
                                      form.formState.errors.team_member_4_phone
                                        ?.message
                                    }
                                  </FormDescription>{" "}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex gap-1 justify-between lg:gap-3 flex-wrap lg:flex-nowrap">
                          <FormField
                            control={form.control}
                            name="team_member_4_institution"
                            render={({ field }) => (
                              <FormItem className="mt-5 w-full lg:w-1/3">
                                <FormLabel>Institution</FormLabel>
                                <Input {...field} />
                                <FormDescription>
                                  <FormDescription>
                                    {
                                      form.formState.errors
                                        .team_member_4_institution?.message
                                    }
                                  </FormDescription>{" "}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="team_member_4_student_id"
                            render={({ field }) => (
                              <FormItem className="mt-5 w-6/12 lg:flex-1">
                                <FormLabel>Student Id</FormLabel>
                                <Input type="text" {...field} />
                                <FormDescription>
                                  {
                                    form.formState.errors
                                      .team_member_4_student_id?.message
                                  }
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="team_member_4_session"
                            render={({ field }) => (
                              <FormItem className="mt-5 w-5/12 lgflex-1">
                                <FormLabel>Session</FormLabel>
                                <Input type="tel" {...field} />
                                <FormDescription>
                                  {
                                    form.formState.errors.team_member_4_session
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
              <div className="flex w-full gap-5 items-start mt-5 flex-col lg:flex-row">
                <FormField
                  control={form.control}
                  name="payment_method"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/2">
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
                    <FormItem className="w-full lg:w-1/2">
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

      <div className="my-10 container mx-auto px-5 lg:px-20 text-gray-600">
        <Separator className="mb-10" />
        <p>Developed by IT Department, Robotics Club of BRAC University</p>
      </div>
    </Form>
  );
};

export default TeamForm;
