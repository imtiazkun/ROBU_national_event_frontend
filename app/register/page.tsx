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

import { toast } from "sonner";
import Image from "next/image";
import Clock from "@/components/Clock";
import Link from "next/link";

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
  {
    id: 1,
    name: "Robo-Strikers",
    participation_type: "team",
    summary:
      "Think of FIFA WORLD CUP, but more futuristic! Robots on the field with strategies sharper than Messi's free kick. The flawless blend of engineering and competitive minds. Two Bots, one ball, unlimited action, powered by the skilled remote handlers or maybe even autonomously. This segment will bring robotic godzillas that will clash on the field fighting to score the perfect goal and bring the trophy with honor. Will your Bot be the next 'Messi'? Join this tournament to find the potential of you and your Bot-footballer.",
    fee: "1200 BDT for 1-3 Members, 400 BDT for additional member (Max 5 Members)",
    rulebook_link: "https://tinyurl.com/muetffnj",
    payment: {
      rep_name: "Zabid Rahman | Senior Executive, Finance & Marketing",
      rep_fb: "https://www.facebook.com/zrasif.zrasif?mibextid=ZbWKwL",
      bKash: "01537027689",
    },
  },
  {
    id: 2,
    name: "Mecha-Sprint",
    participation_type: "team",
    summary:
      "Ever dreamed of being an F1 driver, as well as own a car like one? Buckle up racers, it's time to put your mind on building up the engines and wheels for your Bot, which can accelerate faster on tracks. The path for achieving the award is set and the time is running out. All you have to do is to create a bot which can follow the line, navigating the turns with sharp precision with furious speed. Is your Bot going to be the next F1 driver's car?",
    fee: "1200 BDT for 1-3 Members, 400 BDT for additional member (Max 5 Members)",
    rulebook_link: "https://tinyurl.com/mrnppcm4",
    payment: {
      rep_name: "Zabid Rahman | Senior Executive, Finance & Marketing",
      rep_fb: "https://www.facebook.com/zrasif.zrasif?mibextid=ZbWKwL",
      bKash: "01537027689",
    },
  },
  {
    id: 3,
    name: "Pathfinder",
    participation_type: "team",
    summary:
      "This isn't just a competition about following a path, here a bot has to precisely navigate a complex line-marked path while proving its algorithms can be the boss in motion. This segment is the prime example where programming meets precision parking. In a country where taking the right path isn’t just a robotics challenge but a life lesson, Pathfinder is the perfect segment of the event to challenge your bots problem solving skills of precision on which path to take and ultimately finishing the quest. Will your LFR hold the title of master of the course, or will it get stuck in a never ending loop?",
    fee: "1200 BDT for 1-3 Members, 400 BDT for additional member (Max 5 Members)",
    rulebook_link: "https://tinyurl.com/24y2tata",
    payment: {
      rep_name:
        "Tasnia Mahjabin Maliha | Senior Executive, Finance & Marketing",
      rep_fb: "https://www.facebook.com/share/1Er5wzvvjx/?mibextid=LQQJ4d",
      bKash: "01310770109",
    },
  },
  {
    id: 4,
    name: "Aqua-Wars",
    participation_type: "team",
    summary:
      "Dive into the ultimate aquatic showdown! Picture your bot cutting through waves like a rogue aquatic machine outmaneuvering every challenge. Aqua Wars is where the challenges of robotics and maneuvering water bodies join together. This segment challenges your engineering capacity to design a bot that can not only race but also navigate unpredictable aquatic terrains. Competitors will design water surface robots that has good speed, maneuvering capacity and stability to stand against high velocity and turbulence of water. Will your robot dominate the waves and claim the Aqua Wars championship? Get ready to ride the tides!",
    fee: "1200 BDT for 1-3 Members, 400 BDT for additional member (Max 5 Members)",
    rulebook_link: "https://tinyurl.com/2sy9dhcr",
    payment: {
      rep_name:
        "Tasnia Mahjabin Maliha | Senior Executive, Finance & Marketing",
      rep_fb: "https://www.facebook.com/share/1Er5wzvvjx/?mibextid=LQQJ4d",
      bKash: "01310770109",
    },
  },
  {
    id: 5,
    name: "Prompt-Engineering",
    participation_type: "solo",
    summary:
      "Step into the realm of boundless creativity powered by AI! This segment puts your skills to test as you design functional, creative websites by crafting prompts that explores full potential of ChatGPT. Use GPT to build frameworks, enhance designs or solve challenges in real time. From sleek interfaces to innovative features, from responsive layouts to seamless user experiences let your creativity and AI's power merge to redefine website building. The rebellion begins with your code - are you ready?",
    fee: "500 BDT",
    rulebook_link: "https://tinyurl.com/3j87syb6",
    payment: {
      rep_name: "Shayonto Rayhan | Senior Executive, Finance & Marketing",
      rep_fb: "https://www.facebook.com/share/19fLtXZmht/?mibextid=wwXIfr",
      bKash: "01309029431",
    },
  },
  {
    id: 6,
    name: "Innovator's Exhibit",
    participation_type: "team",
    summary:
      "Bring your vision to life and share it with the world. The Innovators Exhibit aims to give you the stage to show your projects that redefine technology. Whether it’s a game-changing prototype, solution to a real-world problem, or a glimpse into the future - this is your moment. Let your ideas take the spotlight and show the world what you envisioned, designed and built. This is your chance to lead the charge into a new era of technology. Could your idea become the next big thing? Join us to discover your full potential!",
    fee: "1200 BDT for 1-3 Members, 400 BDT for 2 additional member each (Max 5 Members)",
    rulebook_link: "https://tinyurl.com/3t7cy2k2",
    payment: {
      rep_name: "Shayonto Rayhan | Senior Executive, Finance & Marketing",
      rep_fb: "https://www.facebook.com/share/19fLtXZmht/?mibextid=wwXIfr",
      bKash: "01309029431",
    },
  },
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
      payment_method: "bkash",
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

    fetch("https://api.traction.bracurobu.com/registrations", {
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
        window.location.href = "/register/done";
      });
  }

  const [teamMembers, setTeamMembers] = React.useState(0);

  return (
    <Form {...form}>
      <div className="h-auto min-h-screen w-full overflow-hidden">
        <div className="w-full min-h-screen relative bg-bottom">
          <div className="flex pt-10 flex-col lg:flex-row justify-center gap-10 container mx-auto px-5 lg:px-20 ">
            <div className="flex-1 py-10 md:py-0">
              <Image
                width={370}
                height={104}
                src="/sponsor.png"
                alt=""
                style={{
                  borderRadius: "2.8125rem",
                  background: "rgba(255, 255, 255, 0.20)",
                  backdropFilter: "blur(7.349999904632568px)",
                }}
                className="select-none -z-10 bg-white my-4"
              />
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
                <small className="font-bold code">
                  Remaining for Registration
                </small>
              </p>
              <p className="text-justify text-xl">
                Rose from the pits of hell, rise shall we again. With the
                forthcoming advent of OPPO Reno13 Series presents Traction
                অভ্যুদয়, we, the Robotics Club of BRAC University, celebrate
                the revolution with yet another platform for you to channel the
                revolutionary in you.
              </p>
              <div className="mt-5">
                <Link
                  href={"#form"}
                  className="bg-white w-full font-black text-black mt-2 py-4 rounded-lg flex items-center justify-center text-xl gap-2 tracking-widest hover:bg-black transition-colors cursor-pointer hover:text-white"
                >
                  Register{" "}
                  <Image
                    width={50}
                    height={50}
                    src="redirect.svg"
                    className="w-7"
                    alt=""
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 hidden lg:flex items-center justify-center relative select-none">
            <Image
              width={1472}
              height={832}
              src="/astronaut.png"
              alt=""
              className="object-contain absolute -top-14 up levitate select-none -z-10"
            />
          </div>

          <div
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(69,22,189,1) 36%, rgba(211,117,255,1) 100%)",
            }}
            className="absolute top-0 left-0 w-full h-full p-5 -z-20"
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
          id="form"
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
            <Card className="mt-5">
              <CardHeader>
                <CardTitle>
                  {form.watch("segment") == undefined
                    ? "Segment"
                    : form.watch("segment")}
                </CardTitle>
                <CardDescription>
                  {
                    segments.filter(
                      (item) => item.name == form.watch("segment")
                    )[0].participation_type
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  {
                    segments.filter(
                      (item) => item.name == form.watch("segment")
                    )[0].summary
                  }
                </p>

                <Separator className="my-5" />

                <p>
                  <strong>Registration Fee:</strong>{" "}
                  {
                    segments.filter(
                      (item) => item.name == form.watch("segment")
                    )[0].fee
                  }
                </p>

                <Separator className="my-5" />

                <p>
                  <Button type="button" variant={"link"}>
                    <a
                      href={
                        segments.filter(
                          (item) => item.name == form.watch("segment")
                        )[0].rulebook_link
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read Rule Book
                    </a>
                  </Button>
                </p>
              </CardContent>
            </Card>
          )}

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

              <Card className="mt-5">
                <CardHeader>
                  <CardTitle>Payment (Send Money)</CardTitle>
                  <CardDescription>
                    {
                      segments.filter(
                        (item) => item.name == form.watch("segment")
                      )[0].fee
                    }
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Link
                    className="underline"
                    target="_blank"
                    href={
                      segments.filter(
                        (item) => item.name == form.watch("segment")
                      )[0].payment?.rep_fb as string
                    }
                  >
                    {
                      segments.filter(
                        (item) => item.name == form.watch("segment")
                      )[0].payment?.rep_name
                    }
                  </Link>

                  <p className="mt-2 flex items-center gap-2">
                    <div>
                      <Image
                        width={60}
                        height={40}
                        alt="Bkash"
                        src={"/bkash-logo.svg"}
                      />
                    </div>
                    <p className="px-2 py-1 bg-gray-800 text-2xl rounded-sm">
                      {
                        segments.filter(
                          (item) => item.name == form.watch("segment")
                        )[0].payment?.bKash
                      }
                    </p>
                  </p>
                </CardContent>
                <CardFooter>
                  <p>Use Reference: Segment name_Team name</p>
                </CardFooter>
              </Card>

              <div className="flex w-full gap-5 items-start mt-5 flex-col lg:flex-row">
                {/* <FormField
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
                            <SelectLabel>Methods</SelectLabel>
                            {[
                              {
                                id: 1,
                                name: "bKash (Send Money)",
                                icon: "/bkash-logo.svg",
                              },
                            ].map((segment) => (
                              <SelectItem key={segment.id} value={segment.name}>
                                <div className="flex items-center">
                                  <Image
                                    width={60}
                                    height={40}
                                    alt="Bkash"
                                    src={segment.icon}
                                  />
                                  <span>{segment.name}</span>
                                </div>
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
                /> */}

                <FormField
                  control={form.control}
                  name="transaction_id"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/2">
                      <FormLabel>Transaction Id</FormLabel>
                      <Input
                        placeholder="Reference: Segment name_Team name"
                        type="text"
                        {...field}
                      />
                      <FormDescription>
                        {form.formState.errors.applicant_session?.message}
                      </FormDescription>
                      <FormDescription>
                        Use Reference: Segment name_Team name
                      </FormDescription>
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
        <p>Developed by ROBU Web Dev Team, BRAC University</p>
      </div>
    </Form>
  );
};

export default TeamForm;
