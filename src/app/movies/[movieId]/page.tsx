import Image from "next/image";
import MovieDetails from "@/components/movie-details";
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

  // Fetch the movie and include the genres and crew
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
    include: {
      genres: true,
      MovieCrew: {
        include: {
          person: true,
        },
      },
    },
  });

  if (!movie) {
    return notFound();
  }

  // Separate cast and crew members
  const cast = movie.MovieCrew.filter((member) => member.role === "cast");
  const crew = movie.MovieCrew.filter((member) => member.role === "crew");

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
      <MovieDetails
        movie={movie}
        genres={movie.genres}
        cast={cast}
        crew={crew}
      />
    </main>
  );
}
