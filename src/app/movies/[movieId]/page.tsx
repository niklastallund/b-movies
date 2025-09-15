import Image from "next/image";
import MovieDetails from "@/components/MovieDetails";
import { getBackdropUrl } from "@/lib/tmdb-image-url";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import UpdateMovieForm from "@/components/admin-update-form";

export type Params = {
  movieId: string;
};

export default async function MovieDetailsPage(props: { params: Params }) {
  const params = await props.params;
  const movieId = parseInt(params.movieId);

  if (isNaN(movieId) || movieId <= 0) {
    return redirect("/movies");
  }

  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return notFound();
  }

  //We need to get the backdrop image here because it is not drawn in the component
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
      {/* <UpdateMovieForm
        movie={{
          ...movie,
          tmdbId: movie.tmdbId === null ? undefined : movie.tmdbId,
          overview: movie.overview === null ? undefined : movie.overview,
          tagline: movie.tagline === null ? undefined : movie.tagline,
          releaseDate: movie.releaseDate === null ? undefined : movie.releaseDate,
          budget: movie.budget === null ? undefined : movie.budget,
          revenue: movie.revenue === null ? undefined : movie.revenue,
          runtime: movie.runtime === null ? undefined : movie.runtime,
          posterPath: movie.posterPath === null ? undefined : movie.posterPath,
          backdropPath: movie.backdropPath === null ? undefined : movie.backdropPath,
        }}
      /> */}
    </main>
  );
}
