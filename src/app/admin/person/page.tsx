import UpdatePersonForm from "@/components/forms/update-person-form";
import AddTmdbButton from "./add-tmdb-button";
import { addMoviesAndCrewFromTmdb } from "@/actions/api-actions";
import CreatePersonForm from "@/components/forms/create-person-form";

export default async function AdminPersonPage() {
  //TMP PERSON FOR TESTING
  const person = {
    id: 1,
    tmdbId: 12345,
    name: "John Doe",
    birthday: new Date("1990-01-01"),
    deathday: new Date(),
    biography: "A brief biography.",
    profilePath: "/path/to/profile.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div className="flex justify-between gap-5">
      <CreatePersonForm />
      <UpdatePersonForm person={person} />
      <AddTmdbButton
        onAdd={async () => {
          "use server";
          await addMoviesAndCrewFromTmdb();
        }}
      />
    </div>
  );
}
