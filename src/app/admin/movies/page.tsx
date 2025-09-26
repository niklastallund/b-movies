import CreateMovieForm from "@/components/forms/create-movies-form";
import {  requireAdmin } from "@/lib/auth";


//Authorization
export default async function AdminMoviesPage() {
  await requireAdmin();

  return (
    <div className="container mx-auto p-8 space-y-10">
      <h1 className="text-4xl text-sky-600 font-bold">Admin: Filmer</h1>
      <CreateMovieForm />
    </div>
  );
}
