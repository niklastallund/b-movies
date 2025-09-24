import CreateMovieForm from "@/components/forms/create-movies-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

//Authorization
export default async function AdminMoviesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div className="container mx-auto p-8 space-y-10">
      <CreateMovieForm />
    </div>
  );
}
