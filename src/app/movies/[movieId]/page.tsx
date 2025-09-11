import Image from "next/image";
import MovieDetails from "@/components/MovieDetails";
import { getBackdropUrl } from "@/lib/tmdb-image-url";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export type Params = {
  movieId: string;
};

export default async function MovieDetailsPage(props: { params: Params }) {
  const params = props.params;
  const movieId = parseInt(params.movieId);

  if (isNaN(movieId) || movieId <= 0) {
    return redirect("/movies");
  }

  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return redirect("/movies");
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
    </main>
  );
}
