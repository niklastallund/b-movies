import AddTmdbButton from "./add-tmdb-button";
import { addMoviesAndCrewFromTmdb } from "@/actions/api-actions";
import CreatePersonForm from "@/components/forms/create-person-form";

export default async function AdminPersonPage() {
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
