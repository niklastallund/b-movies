import { prisma } from "@/lib/prisma";
import MovieCarousel from "./movie-carousel";
import { Movie } from "@/generated/prisma";

export default async function Carousels() {
  // Fetch all the movies in parallel with a single promise
  const [latest, popular, oldest, cheapest]: [
    Movie[],
    Movie[],
    Movie[],
    Movie[]
  ] = await Promise.all([
    prisma.movie.findMany({ orderBy: { releaseDate: "desc" }, take: 5 }),
    prisma.movie.findMany({ orderBy: { votes: "desc" }, take: 5 }),
    prisma.movie.findMany({ orderBy: { releaseDate: "asc" }, take: 5 }),
    prisma.movie.findMany({ orderBy: { price: "asc" }, take: 5 }),
  ]);

  return (
    <div className="space-y-12">
      <MovieCarousel movies={latest} id="latest" title="Top 5 Latest movies" />
      <MovieCarousel
        movies={popular}
        id="popular"
        title="Top 5 Popular Movies"
      />
      <MovieCarousel movies={oldest} id="oldest" title="Top 5 Oldest Movies" />
      <MovieCarousel
        movies={cheapest}
        id="cheapest"
        title="Top 5 Cheapest Movies"
      />
    </div>
  );
}
