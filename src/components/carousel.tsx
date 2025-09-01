import * as React from "react";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MovieCard } from "@/components/card-movies";

// Datastruktur för att matcha MovieCard-props
interface Movie {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  slug: string;
  releaseDate: string;
  popularity: number;
}

// Komponent för att rendera en enskild karusell
const MovieCarousel = ({
  movies,
  title,
  id,
}: {
  movies: Movie[];
  title: string;
  id: string;
}) => (
  <div className="my-8" id={id}>
    <h2 className="text-3xl font-bold mb-4">{title}</h2>
    <Carousel className="w-full max-w-7xl mx-auto">
      <CarouselContent className="-ml-1">
        {movies.map((movie) => (
          <CarouselItem
            key={movie.id}
            className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/5"
          >
            <div className="p-1">
              <MovieCard movieData={movie} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);
//Funktion för att visa upp varje top 5 lista
export function CarouselSpacing() {
  const [movieData, setMovieData] = useState<{
    latest: Movie[];
    popular: Movie[];
    oldest: Movie[];
    cheapest: Movie[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSortMovies = async () => {
      try {
        setLoading(true);

        // Tills vi har en api
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const apiData: Movie[] = [
          {
            id: 1,
            title: "Dune: Part Two",
            imageUrl: "/images/placeholder1.png",
            price: 129,
            slug: "dune-part-two",
            releaseDate: "2024-03-01",
            popularity: 9.5,
          },
          {
            id: 2,
            title: "Spider-Man: Across the Spider-Verse",
            imageUrl: "/images/placeholder1.png",
            price: 99,
            slug: "spiderman-across-the-spider-verse",
            releaseDate: "2023-06-02",
            popularity: 9.8,
          },
          {
            id: 3,
            title: "Oppenheimer",
            imageUrl: "/images/placeholder1.png",
            price: 149,
            slug: "oppenheimer",
            releaseDate: "2023-07-21",
            popularity: 9.7,
          },
          {
            id: 4,
            title: "The Shawshank Redemption",
            imageUrl: "/images/placeholder1.png",
            price: 79,
            slug: "the-shawshank-redemption",
            releaseDate: "1994-09-23",
            popularity: 9.3,
          },
          {
            id: 5,
            title: "Pulp Fiction",
            imageUrl: "/images/placeholder1.png",
            price: 119,
            slug: "pulp-fiction",
            releaseDate: "1994-10-14",
            popularity: 8.9,
          },
          {
            id: 6,
            title: "The Godfather",
            imageUrl: "/images/placeholder1.png",
            price: 89,
            slug: "the-godfather",
            releaseDate: "1972-03-24",
            popularity: 9.2,
          },
          {
            id: 7,
            title: "Inception",
            imageUrl: "/images/placeholder1.png",
            price: 159,
            slug: "inception",
            releaseDate: "2010-07-16",
            popularity: 8.8,
          },
          {
            id: 8,
            title: "The Dark Knight",
            imageUrl: "/images/placeholder1.png",
            price: 109,
            slug: "the-dark-knight",
            releaseDate: "2008-07-18",
            popularity: 9.0,
          },
          {
            id: 9,
            title: "Forrest Gump",
            imageUrl: "/images/placeholder1.png",
            price: 139,
            slug: "forrest-gump",
            releaseDate: "1994-07-06",
            popularity: 8.8,
          },
          {
            id: 10,
            title: "Avatar: The Way of Water",
            imageUrl: "/images/placeholder1.png",
            price: 179,
            slug: "avatar-the-way-of-water",
            releaseDate: "2022-12-16",
            popularity: 8.2,
          },
          {
            id: 11,
            title: "The Matrix",
            imageUrl: "/images/placeholder1.png",
            price: 69,
            slug: "the-matrix",
            releaseDate: "1999-03-31",
            popularity: 8.7,
          },
          {
            id: 12,
            title: "Interstellar",
            imageUrl: "/images/placeholder1.png",
            price: 129,
            slug: "interstellar",
            releaseDate: "2014-11-07",
            popularity: 8.6,
          },
          {
            id: 13,
            title: "The Silence of the Lambs",
            imageUrl: "/images/placeholder1.png",
            price: 59,
            slug: "the-silence-of-the-lambs",
            releaseDate: "1991-02-14",
            popularity: 8.6,
          },
          {
            id: 14,
            title: "The Green Mile",
            imageUrl: "/images/placeholder1.png",
            price: 105,
            slug: "the-green-mile",
            releaseDate: "1999-12-10",
            popularity: 8.6,
          },
          {
            id: 15,
            title: "Saving Private Ryan",
            imageUrl: "/images/placeholder1.png",
            price: 95,
            slug: "saving-private-ryan",
            releaseDate: "1998-07-24",
            popularity: 8.6,
          },
          {
            id: 16,
            title: "Titanic",
            imageUrl: "/images/placeholder1.png",
            price: 110,
            slug: "titanic",
            releaseDate: "1997-12-19",
            popularity: 7.9,
          },
          {
            id: 17,
            title: "Jurassic Park",
            imageUrl: "/images/placeholder1.png",
            price: 65,
            slug: "jurassic-park",
            releaseDate: "1993-06-11",
            popularity: 8.2,
          },
          {
            id: 18,
            title: "The Lion King",
            imageUrl: "/images/placeholder1.png",
            price: 50,
            slug: "the-lion-king",
            releaseDate: "1994-06-24",
            popularity: 8.5,
          },
          {
            id: 19,
            title: "Toy Story",
            imageUrl: "/images/placeholder1.png",
            price: 45,
            slug: "toy-story",
            releaseDate: "1995-11-22",
            popularity: 8.3,
          },
          {
            id: 20,
            title: "Star Wars: A New Hope",
            imageUrl: "/images/placeholder1.png",
            price: 75,
            slug: "star-wars-a-new-hope",
            releaseDate: "1977-05-25",
            popularity: 8.6,
          },
        ];

        // Hämtar det Top 5 Fån varje kategori
        const latest = [...apiData]
          .sort(
            (a, b) =>
              new Date(b.releaseDate).getTime() -
              new Date(a.releaseDate).getTime()
          )
          .slice(0, 5);

        const popular = [...apiData]
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 5);

        const oldest = [...apiData]
          .sort(
            (a, b) =>
              new Date(a.releaseDate).getTime() -
              new Date(b.releaseDate).getTime()
          )
          .slice(0, 5);

        const cheapest = [...apiData]
          .sort((a, b) => a.price - b.price)
          .slice(0, 5);

        setMovieData({ latest, popular, oldest, cheapest });
      } catch (err) {
        setError("Kunde inte hämta filmer från API:et.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSortMovies();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Laddar filmer...</div>;
  }

  if (error || !movieData) {
    return (
      <div className="text-center p-4 text-red-500">
        {error || "Kunde inte ladda data."}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <MovieCarousel
        movies={movieData.latest}
        id="latest"
        title="Latest Movies"
      />
      <MovieCarousel
        movies={movieData.popular}
        id="popular"
        title="Most Popular Movies"
      />
      <MovieCarousel
        movies={movieData.oldest}
        id="oldest"
        title="Oldest Movies"
      />
      <MovieCarousel
        movies={movieData.cheapest}
        id="cheapest"
        title="Cheapest Movies"
      />
    </div>
  );
}
