import MovieDetails from "@/components/MovieDetails";

interface MovieDetailsPageProps {
  params: {
    movieId: string;
  };
}

export default async function MovieDetailsPage({
  params,
}: MovieDetailsPageProps) {
  const { movieId } = params;

  // I en verklig applikation skulle du använda movieId för att hämta data från din databas.
  // Till exempel: const movie = await prisma.movie.findUnique({ where: { id: parseInt(movieId) } });

  // EXEMPEL med hårdkodad data:
  const movie = {
    id: 1,
    title: "A Movie TITLE",
    releaseDate: new Date("2023-10-26"),
    runtime: 120,
    budget: 50000000,
    revenue: 150000000,
    description: "A description about the movie here",
    imageURL: "https://via.placeholder.com/400x600",
    price: 19.99,
    stock: 50,
  };

  if (!movie) {
    return <div>Filmen hittades inte.</div>;
  }

  return (
    <main className="container mx-auto py-8">
      <MovieDetails movie={movie} />
    </main>
  );
}
