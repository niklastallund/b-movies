"use client";

import { createPerson } from "@/actions/person";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  createPersonSchema,
  CreatePersonInput,
  UpdatePersonInput,
  updatePersonSchema,
} from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function AdminPersonForm() {
  const form = useForm<CreatePersonInput>({
    resolver: zodResolver(createPersonSchema),
    defaultValues: {
      tmdbId: undefined,
      name: "",
      birthday: "",
      deathday: "",
      biography: "",
      profilePath: "",
    },
  });

  async function onsubmit(data: CreatePersonInput) {
    // Convert tmdbId to number if it's a string
    const payload = {
      ...data,
      tmdbId:
        typeof data.tmdbId === "string" ? Number(data.tmdbId) : data.tmdbId,
    };
    await createPerson(payload);
  }

  return (
    <Card className="w-full max-w-lg mx-auto bg-black/20 backdrop-blur-xs border-red-900  ">
      <CardHeader>
        <CardTitle>Create Person</CardTitle>
        <CardDescription>Enter details to add a new person </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="tmdbId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TMDB ID</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birthday</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deathday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deathday (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="biography"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biography</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profilePath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile path</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
