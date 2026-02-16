import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ClassDetails } from "@/types";
import { useShow } from "@refinedev/core";
import { AdvancedImage } from "@cloudinary/react";
import { bannerPhoto } from "@/lib/cloudinary";
import { useModalForm } from "@refinedev/react-hook-form";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { authClient } from "@/lib/auth-client";

const ShowClassDetails = () => {
  const { query } = useShow<ClassDetails>({ resource: "classes" });
  const classDetails = query?.data?.data;
  const isError = query?.isError;
  const isLoading = query?.isLoading;
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  const currentUserId = session?.user?.id;
  // const {
  //   getInputProps,
  //   saveButtonProps,
  //    formState: { errors },
  //   refineCore: { onFinish, formLoading },
  //   modal: { show, close, title, visible },
  //       handleSubmit,
  //       control,
  // } = useModalForm({
  //   refineCoreProps: { action: "create" },
  //   initialValues: {
  //     title: "",
  //     status: "",
  //     content: "",
  //   },
  //   validate: {
  //     title: (value) => (value.length < 2 ? "Too short title" : null),
  //     status: (value) => (value.length <= 0 ? "Status is required" : null),
  //   },
  // });

  const form = useModalForm({
    refineCoreProps: {
      action: "create",
      resource: "enrollments",
    },
  });

  const {
    formState: { isSubmitting },
    refineCore: { onFinish },
    modal: { show, close, visible },
    handleSubmit,
    control,
  } = form;

  if (isLoading || isError || !classDetails) {
    return (
      <ShowView className="class-view class-show">
        <ShowViewHeader resource="classes" title="Class Details" />
        <p className="state-message">
          {isLoading
            ? "Loading class details..."
            : isError
            ? "Failed to load class details"
            : "Class details not found"}
        </p>
      </ShowView>
    );
  }

  const customSubmit = (values: any) => {
    onFinish({
      ...values,
      inviteCode: classDetails?.inviteCode,
      classId: classDetails?.id,
      studentId: currentUserId,
    });
  };
  const teacherName = classDetails?.teacher?.name ?? "Unknown";

  const teacherInitials = teacherName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const placeholderUrl = `https://placehold.co/600x400?text=${encodeURIComponent(
    teacherInitials || "NA",
  )}`;

  const {
    capacity,

    description,
    name,
    status,
    bannerCldPubId,
    bannerUrl,
    department,
    // inviteCode,
    subject,
    teacher,
  } = classDetails;

  return (
    <ShowView className="class-view class-show">
      <Dialog open={visible}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Enter the invite code to join the class</DialogTitle>
          </DialogHeader>
          <X
            className="absolute top-1 cursor-pointer font-medium right-1 text-gray-500 w-5 h-5"
            onClick={close}
          />

          <Form {...form}>
            <form onSubmit={handleSubmit(customSubmit)} className="space-y-5">
              <FormField
                control={control}
                name="inviteCode"
                rules={{
                  required: "Invite code is required",
                  minLength: {
                    value: 3,
                    message: "Invite code too short",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Invite Code <span className="text-red-500">*</span>
                    </FormLabel>

                    <FormControl>
                      <Input placeholder="Enter invite code" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {isSubmitting ? "Joining..." : "Join Class"}
              </Button>
            </form>
          </Form>

          {/* <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" onClick={close}>
                Close
              </Button>
            </DialogClose>
          </DialogFooter> */}
          {/* <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader> */}
        </DialogContent>
      </Dialog>
      <ShowViewHeader resource="classes" title="Class Details" />

      <div className="banner">
        {bannerUrl ? (
          <AdvancedImage
            alt=""
            cldImg={bannerPhoto(bannerCldPubId ?? "", name)}
          />
        ) : (
          <div className="placeholder" />
        )}
      </div>
      <Card className="details-card">
        <div className="details-header">
          <div>
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
          <div>
            <Badge variant={"outline"}>{capacity} spots</Badge>
            <Badge
              variant={status === "active" ? "default" : "secondary"}
              data-status={status}
            >
              {status.toUpperCase()}
            </Badge>
          </div>
        </div>
        <div className="details-grid">
          <div className="instructor">
            <p>Instructor</p>
            <div>
              <img src={teacher?.image ?? placeholderUrl} alt="" />
              <div>
                <p>{teacherName}</p>
                <p>{teacher?.email}</p>
              </div>
            </div>
          </div>
          <div className="department">
            <p>Department</p>
            <div>
              <p>{department?.name}</p>
              <p> {department?.description}</p>
            </div>
          </div>
        </div>
        <Separator />

        <div className="subject">
          <p>Subject</p>
          <div>
            <Badge variant={"outline"}>{subject?.code}</Badge>
            <p>{subject?.name}</p>
            <p>{subject?.description}</p>
          </div>
        </div>
        <Separator />

        <div className="join">
          <h2>Join Class</h2>
          <ol>
            <li>Ask your teacher for the invite code</li>
            <li>Click on "Join Class" button</li>
            <li>Paste the code and click "join"</li>
          </ol>
        </div>
        <Button size={"lg"} className="w-full" onClick={() => show()}>
          Join Class
        </Button>
      </Card>
    </ShowView>
  );
};

export default ShowClassDetails;
