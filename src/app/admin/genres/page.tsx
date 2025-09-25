//src\app\admin\genres\page.tsx

import { getAllGenres } from "@/actions/genres";
import CreateGenreForm from "@/components/forms/create-genre-form";
import DeleteGenreButton from "@/components/forms/delete-genre-button";

export default async function AdminGenresPage() {
  const genres = await getAllGenres();

  return (
    <div className="container mx-auto p-8 space-y-10">
      <h1 className="text-4xl text-sky-600 font-bold ">Admin: Genres</h1>

      {/* Form to create a new genre */}
      <CreateGenreForm />

      {/* List of existing genres */}
      <div className="space-y-4">
        <h2 className="text-2xl text-sky-600 font-semibold ">
          Existing genres
        </h2>

        {genres.length > 0 ? (
          <ul className="space-y-3">
            {genres.map((genre) => (
              <li
                key={genre.id}
                className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-sm"
              >
                <div>
                  <h3 className="font-medium">{genre.name}</h3>
                  <p className="text-sm text-muted-foreground italic">
                    {genre.description || "No description"}
                  </p>
                </div>

                <DeleteGenreButton id={genre.id} name={genre.name} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No genres found.</p>
        )}
      </div>
    </div>
  );
}
