//Admin sida för Genres
import { getAllGenres, createGenre, deleteGenre } from "@/actions/genres";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function AdminGenresPage() {
  const genres = await getAllGenres();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl text-sky-600 font-bold mb-8">Admin: Genrer</h1>

      {/* Skapa ny genre */}
      <div className="mb-12 border-b pb-8">
        <h2 className="text-2xl text-red-700 mb-4">Skapa ny genre</h2>
        <form action={createGenre} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Namn</Label>
            <Input id="name" name="name" placeholder="T.ex. Sci-Fi" required />
          </div>
          <div>
            <Label htmlFor="description">Beskrivning</Label>
            <Input
              id="description"
              name="description"
              placeholder="Beskrivning av genren"
            />
          </div>
          <Button type="submit" className="w-fit text-gray-50">
            Skapa genre
          </Button>
        </form>
      </div>

      {/* Lista befintliga genrer */}
      <div className="mb-12">
        <h2 className="text-2xl text-sky-600 mb-4">Befintliga genrer</h2>
        <ul className="space-y-4">
          {genres.length > 0 ? (
            genres.map((genre) => (
              <li
                key={genre.id}
                className="flex items-center justify-between p-4 rounded-md bg-sky-100"
              >
                <div>
                  <h3 className="font-semibold text-red-800">{genre.name}</h3>
                  <p className="text-sm italic text-gray-600">
                    {genre.description || "Ingen beskrivning"}
                  </p>
                </div>
                <form action={deleteGenre}>
                  <input type="hidden" name="id" value={genre.id} />
                  <Button type="submit" variant="destructive">
                    Ta bort
                  </Button>
                </form>
              </li>
            ))
          ) : (
            <p className="text-gray-500">Inga genrer hittades.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
