//src\components\admin-genre-form.tsx
"use client";

import { createGenre } from "@/actions/genres";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
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
import { createGenreSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type CreateGenreInput = z.infer<typeof createGenreSchema>;

// Create Genre using react-hook-form + shadcn Form
export default function CreateGenreForm() {
  const form = useForm<CreateGenreInput>({
    resolver: zodResolver(createGenreSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: CreateGenreInput) {
    await createGenre(values);
    form.reset();
  }

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Create new genre</CardTitle>
        <CardDescription>
          Add a new movie genre to the database.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="E.g. Sci-Fi" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="p-0">
              <Button type="submit">Create genre</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
