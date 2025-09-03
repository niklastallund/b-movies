import MovieDetails from "@/components/MovieDetails";
import FindMoviesByDirectors from "@/lib/tmdb";

interface MovieDetailsPageProps {
  params: {
    movieId: string;
  };
}

export default async function MovieDetailsPage({
  params,
}: MovieDetailsPageProps) {

  //This is just for testing!!!
  const movies = await FindMoviesByDirectors()
  const movie = movies[4]


  if (!movie) {
    return <div>Filmen hittades inte.</div>;
  }

  return (
    <main className="container mx-auto py-8">
      <MovieDetails movie={movie} />
    </main>
  );
}
