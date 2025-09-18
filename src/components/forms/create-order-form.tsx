"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { createOrder } from "@/actions/orders";
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

// dataTyp för formulärtillstånd och fel
interface FormState {
  success: boolean;
  errors: {
    _global?: string[];
    userId?: string[];
    // Lägg till fält för filmer här om det behövs
  };
}

const initialState: FormState = {
  success: false,
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4" type="submit" aria-disabled={pending}>
      {pending ? "Skapar order..." : "Skapa ny order"}
    </Button>
  );
}
// Komponent för att skapa en ny order
export default function CreateOrderForm() {
  const [state, formAction] = useActionState(createOrder as any, initialState);

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Skapa ny order</CardTitle>
        <CardDescription>Skapa en ny order i databasen.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          {state.errors?._global && (
            <p className="text-destructive mb-4">{state.errors._global[0]}</p>
          )}
          <div className="space-y-2">
            <Label htmlFor="userId">Användar-ID</Label>
            <Input
              id="userId"
              name="userId"
              placeholder="T.ex. clx2k7..."
              required
            />
            {state.errors?.userId && (
              <p className="text-destructive text-sm">
                {state.errors.userId[0]}
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
