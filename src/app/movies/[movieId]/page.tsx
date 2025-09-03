import Image from "next/image";
import MovieDetails from "@/components/MovieDetails";
import FindMoviesByDirectors from "@/lib/tmdb";
import { getBackdropUrl } from "@/lib/tmdb-image-url";

export default async function MovieDetailsPage() {
  const movies = await FindMoviesByDirectors();
  const movie = movies[4];

  if (!movie) {
    return <div>Filmen hittades inte.</div>;
  }

  const backdropUrl =
    getBackdropUrl(movie.backdropPath, "w1280") || "/default-image.jpg";

  return (
    <main className="relative min-h-screen flex items-center justify-center">
      {/* Fullscreen Backdrop */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={backdropUrl}
          alt={`${movie.title} backdrop`}
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>
      {/* Transparent Card */}
      <MovieDetails movie={movie} />
    </main>
  );
}
