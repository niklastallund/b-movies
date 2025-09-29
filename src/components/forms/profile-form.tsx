"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Save, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface ProfileFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
}

const ProfileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
});

type ProfileValues = z.infer<typeof ProfileSchema>;

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Could not update profile. Please try again.";
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<ProfileValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: { name: user.name ?? "", email: user.email ?? "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: ProfileValues) => {
    setMessage(null);

    const ops: Promise<unknown>[] = [];
    if (values.email !== user.email) {
      ops.push(
        authClient.changeEmail({
          newEmail: values.email,
          callbackURL: "/dashboard",
        })
      );
    }
    if (values.name !== user.name) {
      ops.push(
        authClient.updateUser({
          name: values.name,
        })
      );
    }

    if (ops.length === 0) {
      setMessage("Nothing to update.");
      return;
    }

    try {
      await Promise.all(ops);
      setMessage(
        values.email !== user.email
          ? "Profile updated. If you changed your email, check your inbox to verify."
          : "Profile updated successfully."
      );
    } catch (err: unknown) {
      setMessage(getErrorMessage(err));
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {message && (
            <p className="text-sm text-muted-foreground">{message}</p>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="pl-10"
                disabled={isSubmitting}
                {...form.register("name")}
              />
            </div>
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="pl-10"
                disabled={isSubmitting}
                {...form.register("email")}
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}