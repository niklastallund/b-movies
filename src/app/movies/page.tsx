import { MovieCard } from "@/components/card-movies";
import GenreFilter from "@/components/genre-filter";
import SearchBar from "@/components/search-bar";
import { prisma } from "@/lib/prisma";

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: { q?: string; genre?: string };
}) {
  const query = searchParams.q || "";
  const selectedGenre = searchParams.genre || "";

  const genres = await prisma.genre.findMany({
    orderBy: { name: "asc" },
  });

  // Fetch movies from the database, optionally filtering by search query and genre
  // The selectedGenre filter is only applied if a genre is selected (not an empty string)
  const movies = await prisma.movie.findMany({
    orderBy: { title: "asc" },
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
      ...(selectedGenre
        ? {
            genres: {
              some: { name: selectedGenre },
            },
          }
        : {}),
    },
  });

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-sky-800 ">Our Movies</h1>
      <div className="mb-8 mt-8 grid text-gray-50  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
        <div className="w-full">
          <SearchBar />
        </div>
        <div className="w-1/2">
          <GenreFilter genres={genres} selectedGenre={selectedGenre} />
        </div>
      </div>

      {/* film grid */}
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
