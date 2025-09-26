import AddTmdbButton from "./add-tmdb-button";
import { addMoviesAndCrewFromTmdb } from "@/actions/api-actions";
import CreatePersonForm from "@/components/forms/create-person-form";
import { requireAdmin } from "@/lib/auth";

export default async function AdminPersonPage() {
  await requireAdmin()
  
  return (
    <div className="flex justify-between gap-5">
      <CreatePersonForm />
      <AddTmdbButton
        onAdd={async () => {
          "use server";
          await addMoviesAndCrewFromTmdb();
        }}
      />
    </div>
  );
}
