"use client";

import SignInForm from "@/components/sign-in-form";
import { Button } from "@/components/ui/button";
import FindMoviesByDirectors from "@/lib/tmdb";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignInForm />
      <Button onClick={FindMoviesByDirectors}>
        TMP BUTTON FOR API TESTING
      </Button>
    </div>
  );
}
