"use client"; // Vi måste använda "use client" eftersom useState/useEffect behövs

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


//TODO
// Does not need to be a client component
// Change so that it fetches data from an API instead of hardcoded data
// Import the interface Movie from the prisma generated file
// Get movie data from prisma database instead
// 

// Datastruktur för att matcha MovieCard-props
interface Movie {
  id: number;
  imageURL: string;
  title: string;
  price: number;
  stock: number;
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
    <Carousel className="w-full  max-w-7xl mx-auto">
      <CarouselContent className="-ml-1">
        {movies.map((movie) => (
          <CarouselItem
            key={movie.id}
            className="pl-1  basis-1/2 md:basis-1/3 lg:basis-1/5"
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

// Huvudkomponent som hämtar och sorterar hårdkodad data
export default function Carousels() {
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

        // Hårdkodad data som simulerar ett API-anrop
        const apiData: Movie[] = [
          {
            id: 1,
            title: "Dune: Part Two",
            imageURL: "https://via.placeholder.com/400x600",
            price: 129,
            stock: 10,
            releaseDate: "2024-03-01",
            popularity: 9.5,
          },
          {
            id: 2,
            title: "Spider-Man: Across the Spider-Verse",
            imageURL: "https://via.placeholder.com/400x600",
            price: 99,
            stock: 10,
            releaseDate: "2023-06-02",
            popularity: 9.8,
          },
          {
            id: 3,
            title: "Oppenheimer",
            imageURL: "https://via.placeholder.com/400x600",
            price: 149,
            stock: 10,
            releaseDate: "2023-07-21",
            popularity: 9.7,
          },
          {
            id: 4,
            title: "The Shawshank Redemption",
            imageURL: "https://via.placeholder.com/400x600",
            price: 79,
            stock: 10,
            releaseDate: "1994-09-23",
            popularity: 9.3,
          },
          {
            id: 5,
            title: "Pulp Fiction",
            imageURL: "https://via.placeholder.com/400x600",
            price: 119,
            stock: 10,
            releaseDate: "1994-10-14",
            popularity: 8.9,
          },
          {
            id: 6,
            title: "The Godfather",
            imageURL: "https://via.placeholder.com/400x600",
            price: 89,
            stock: 10,
            releaseDate: "1972-03-24",
            popularity: 9.2,
          },
          {
            id: 7,
            title: "Inception",
            imageURL: "https://via.placeholder.com/400x600",
            price: 159,
            stock: 10,
            releaseDate: "2010-07-16",
            popularity: 8.8,
          },
          {
            id: 8,
            title: "The Dark Knight",
            imageURL: "https://via.placeholder.com/400x600",
            price: 109,
            stock: 10,
            releaseDate: "2008-07-18",
            popularity: 9.0,
          },
          {
            id: 9,
            title: "Forrest Gump",
            imageURL: "https://via.placeholder.com/400x600",
            price: 139,
            stock: 10,
            releaseDate: "1994-07-06",
            popularity: 8.8,
          },
          {
            id: 10,
            title: "Avatar: The Way of Water",
            imageURL: "https://via.placeholder.com/400x600",
            price: 179,
            stock: 10,
            releaseDate: "2022-12-16",
            popularity: 8.2,
          },
          {
            id: 11,
            title: "The Matrix",
            imageURL: "https://via.placeholder.com/400x600",
            price: 69,
            stock: 10,
            releaseDate: "1999-03-31",
            popularity: 8.7,
          },
          {
            id: 12,
            title: "Interstellar",
            imageURL: "https://via.placeholder.com/400x600",
            price: 129,
            stock: 10,
            releaseDate: "2014-11-07",
            popularity: 8.6,
          },
          {
            id: 13,
            title: "The Silence of the Lambs",
            imageURL: "https://via.placeholder.com/400x600",
            price: 59,
            stock: 10,
            releaseDate: "1991-02-14",
            popularity: 8.6,
          },
          {
            id: 14,
            title: "The Green Mile",
            imageURL: "https://via.placeholder.com/400x600",
            price: 105,
            stock: 10,
            releaseDate: "1999-12-10",
            popularity: 8.6,
          },
          {
            id: 15,
            title: "Saving Private Ryan",
            imageURL: "https://via.placeholder.com/400x600",
            price: 95,
            stock: 10,
            releaseDate: "1998-07-24",
            popularity: 8.6,
          },
          {
            id: 16,
            title: "Titanic",
            imageURL: "https://via.placeholder.com/400x600",
            price: 110,
            stock: 10,
            releaseDate: "1997-12-19",
            popularity: 7.9,
          },
          {
            id: 17,
            title: "Jurassic Park",
            imageURL: "https://via.placeholder.com/400x600",
            price: 65,
            stock: 10,
            releaseDate: "1993-06-11",
            popularity: 8.2,
          },
          {
            id: 18,
            title: "The Lion King",
            imageURL: "https://via.placeholder.com/400x600",
            price: 50,
            stock: 10,
            releaseDate: "1994-06-24",
            popularity: 8.5,
          },
          {
            id: 19,
            title: "Toy Story",
            imageURL: "https://via.placeholder.com/400x600",
            price: 45,
            stock: 10,
            releaseDate: "1995-11-22",
            popularity: 8.3,
          },
          {
            id: 20,
            title: "Star Wars: A New Hope",
            imageURL: "https://via.placeholder.com/400x600",
            price: 75,
            stock: 10,
            releaseDate: "1977-05-25",
            popularity: 8.6,
          },
        ];

        // Hämta de Top 5 från varje kategori
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
    return <div className="text-center p-4">Loading Movies...</div>;
  }

  if (error || !movieData) {
    return (
      <div className="text-center p-4 text-red-500">
        {error || "Could not find any data."}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <MovieCarousel
        movies={movieData.latest}
        id="latest"
        title="Top 5 Latest movies"
      />
      <MovieCarousel
        movies={movieData.popular}
        id="popular"
        title="Top 5 Popular Movies"
      />
      <MovieCarousel
        movies={movieData.oldest}
        id="oldest"
        title="Top 5 Olderst Movies"
      />
      <MovieCarousel
        movies={movieData.cheapest}
        id="cheapest"
        title="Top 5 Cheepest Movies"
      />
    </div>
  );
}
