//src\components\admin-genre-form.tsx
"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { createGenre } from "@/actions/genres";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface FormErrors {
  _global?: string[];
  name?: string[];
  description?: string[];
}

interface FormState {
  success: boolean;
  errors: FormErrors;
}

const initialState: FormState = {
  success: false,
  errors: {},
};
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? "Skapar..." : "Skapa genre"}
    </Button>
  );
}
// Komponent för att skapa en ny genere
export default function GenreForm() {
  const [state, formAction] = useActionState(async (prevState, formData) => {
    let data: any = formData;
    if (typeof FormData !== "undefined" && formData instanceof FormData) {
      data = Object.fromEntries(formData.entries());
    }
    return await createGenre(data);
  }, initialState);
  // IGNORE
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Skapa ny genre</CardTitle>
        <CardDescription>
          Lägg till en ny filmgenre i databasen.
        </CardDescription>
      </CardHeader>

      <form action={formAction} className="space-y-4">
        <CardContent>
          {state.errors?._global && (
            <p className="text-destructive mb-4">{state.errors._global[0]}</p>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Namn</Label>
            <Input id="name" name="name" placeholder="T.ex. Sci-Fi" required />
            {state.errors?.name && (
              <p className="text-destructive text-sm">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Beskrivning</Label>
            <Input
              id="description"
              name="description"
              placeholder="T.ex. Vetenskaplig fiktion"
            />
            {state.errors?.description && (
              <p className="text-destructive text-sm">
                {state.errors.description[0]}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
