import { MovieCard } from "@/components/card-movies";
import SearchBar from "@/components/search-bar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { prisma } from "@/lib/prisma";

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  const movies = await prisma.movie.findMany({
    orderBy: { title: "asc" },
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-sky-800 ">Our Movies</h1>
      <div className="mb-8 mt-8 grid text-gray-50  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
        <div className="w-full">
          <SearchBar />
        </div>
      </div>

      {/* FILTRERA KATEGORI */}
      {/* <div className="w-full">
          <Label htmlFor="genre-select">Select Genre</Label>
          <Select onValueChange={setSelectedGenre}>
            <SelectTrigger id="genre-select">
              <SelectValue placeholder="All Genres" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="all">All Genres</SelectItem>
              {allGenres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}

      {/* SORTERING EFTER PRIS TITEL */}
      {/* <div className="w-full">
          <Label htmlFor="sort-select">Sort by</Label>
          <Select onValueChange={setSortOrder}>
            <SelectTrigger id="sort-select">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price (Low to High)</SelectItem>
              <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* FILM GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No movies match your search.
          </p>
        )}
      </div>
    </main>
  );
}
