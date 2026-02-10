/* eslint-disable @typescript-eslint/no-explicit-any */
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { CreateView } from "@/components/refine-ui/views/create-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useBack } from "@refinedev/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { classSchema } from "@/lib/schema";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import UploadWidget from "@/components/upload-widget";

const CreateClass = () => {
  const back = useBack();

  const form = useForm<z.infer<typeof classSchema>>({
    resolver: zodResolver(classSchema),
    refineCoreProps: {
      resource: "classes",
      action: "create",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = form;

  function onSubmit(data: z.infer<typeof classSchema>) {
    try {
      // console.log("")
      console.log(data);
    } catch (error) {
      console.log("Error creating new classes", error);
    }
  }

  const teachers = [
    { id: "1", name: "Rahul Sharma" },
    { id: "2", name: "Anita Verma" },
  ];

  // Subjects array: id, name, and code (uppercase & shortened)
  const subjects = [
    { id: 101, name: "Mathematics", code: "MATH" },
    { id: 102, name: "Physics", code: "PHYS" },
  ];

  const status = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const bannerPublicId = form.watch("bannerCldPubId");
  const setBannerImage = (file, field) => {
    if (file) {
      field.onChange(file);
      form.setValue("bannerCldPubId", file.publicId, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      field.onChange("");
      form.setValue("bannerCldPubId", "", {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };
  return (
    <CreateView className="create-view">
      <Breadcrumb />
      <h1 className="page-title">Create a Class</h1>
      <div className="intro-row">
        <p>Provide the required information below to add a class</p>
        <Button onClick={back}>Go Back</Button>
      </div>
      <Separator />

      <div className="my-4 flex items-center ">
        <Card className="class-form-card">
          <CardHeader className="relative z-10">
            <CardTitle className="text-2xl pb-0 font-bold">
              Fill out the form
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="mt-7">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={control}
                  name="bannerUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Banner Image <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <UploadWidget
                          value={
                            field.value
                              ? {
                                  url: field.value,
                                  publicId: bannerPublicId ?? "",
                                }
                              : ""
                          }
                          onChange={(file: any, field: any) =>
                            setBannerImage(file, field)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                      {errors.bannerCldPubId && !errors.bannerUrl && (
                        <p className="text-sm text-destructive">
                          {errors.bannerCldPubId.message?.toString()}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Class Name <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Introduction to Biology - Section A"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="subjectId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Subject <span className="text-orange-600">*</span>
                        </FormLabel>
                        <Select
                          value={field?.value?.toString()}
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          defaultValue={field?.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjects.map((sub) => (
                              <SelectItem
                                value={sub.id.toString()}
                                key={sub.id}
                              >
                                {sub.name}({sub.code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="teacherId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Teacher <span className="text-orange-600">*</span>
                        </FormLabel>
                        <Select
                          value={field?.value}
                          onValueChange={field.onChange}
                          defaultValue={field?.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a teacher" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {teachers.map((teacher) => (
                              <SelectItem value={teacher.id} key={teacher.id}>
                                {teacher.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input placeholder="0" {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Status <span className="text-orange-600">*</span>
                        </FormLabel>
                        <Select
                          value={field?.value}
                          onValueChange={field.onChange}
                          defaultValue={field?.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {status.map((stat) => (
                              <SelectItem value={stat.value} key={stat.value}>
                                {stat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief Description about the class"
                            {...field}
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Separator />
                <Button type="submit" className="w-full text-center">
                  {isSubmitting ? (
                    <Loader className="animate-spin duration-700 ease-linear" />
                  ) : (
                    "Create Class"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </CreateView>
  );
};

export default CreateClass;
