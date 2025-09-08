//src\app\admin\genres\page.tsx

import { deleteGenre, getAllGenres } from "@/actions/genres";
import { Button } from "@/components/ui/button";
import GenreForm from "@/components/admin-genre-form"; // OBS! Kontrollera stavning och versaler

export default async function AdminGenresPage() {
  const genres = await getAllGenres();

  return (
    <div className="container mx-auto p-8 space-y-10">
      <h1 className="text-4xl text-sky-600 font-bold ">Admin: Genrer</h1>

      {/* Form för att skapa ny genre */}
      <GenreForm />

      {/* Lista med befintliga genrer */}
      <div className="space-y-4">
        <h2 className="text-2xl text-sky-600 font-semibold ">
          Befintliga genrer
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
                    {genre.description || "Ingen beskrivning"}
                  </p>
                </div>

                <form action={deleteGenre}>
                  <input type="hidden" name="id" value={genre.id} />
                  <Button
                    type="submit"
                    className="bg-red-800 text-white-50"
                    size="sm"
                  >
                    Ta bort
                  </Button>
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">Inga genrer hittades.</p>
        )}
      </div>
    </div>
  );
}
