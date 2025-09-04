"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MovieCard } from "@/components/card-movies";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FindMoviesByDirectors from "@/lib/tmdb";
import { Movie } from "@/lib/types";

// Data matchar movie modell fårn prisma shema

// const movieData: Movie[] = [
//   //EXEMPEL
//   {
//     id: 1,
//     title: "Dune: Part Two",
//     posterPath: "https://via.placeholder.com/400x600",
//     price: 129,
//     stock: 10,
//     genres: ["Sci-Fi", "Action"],
//     actors: ["Timothée Chalamet", "Zendaya"],
//   },
//   {
//     id: 2,
//     title: "Oppenheimer",
//     posterPath: "https://via.placeholder.com/400x600",
//     price: 149,
//     stock: 10,
//     genres: ["Biography", "Drama"],
//     actors: ["Cillian Murphy", "Emily Blunt"],
//   },
//   {
//     id: 3,
//     title: "The Shawshank Redemption",
//     posterPath: "https://via.placeholder.com/400x600",
//     price: 79,
//     stock: 5,
//     genres: ["Drama"],
//     actors: ["Tim Robbins", "Morgan Freeman"],
//   },
//   {
//     id: 4,
//     title: "Pulp Fiction",
//     posterPath: "https://via.placeholder.com/400x600",
//     price: 119,
//     stock: 2,
//     genres: ["Crime", "Drama"],
//     actors: ["John Travolta", "Uma Thurman"],
//   },
//   {
//     id: 5,
//     title: "Interstellar",
//     posterPath: "https://via.placeholder.com/400x600",
//     price: 129,
//     stock: 0,
//     genres: ["Sci-Fi", "Adventure"],
//     actors: ["Matthew McConaughey", "Anne Hathaway"],
//   },
//   {
//     id: 6,
//     title: "The Dark Knight",
//     posterPath: "https://via.placeholder.com/400x600",
//     price: 109,
//     stock: 7,
//     genres: ["Action", "Crime"],
//     actors: ["Christian Bale", "Heath Ledger"],
//   },
//   {
//     id: 7,
//     title: "Inception",
//     posterPath: "https://via.placeholder.com/400x600",
//     price: 159,
//     stock: 15,
//     genres: ["Sci-Fi", "Action"],
//     actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
//   },
//   {
//     id: 8,
//     title: "Forrest Gump",
//     posterPath: "https://via.placeholder.com/400x600",
//     price: 139,
//     stock: 4,
//     genres: ["Drama", "Romance"],
//     actors: ["Tom Hanks"],
//   },
//   {
//     id: 9,
//     title: "The Matrix",
//     posterPath: "https://via.placeholder.com/400x600",
//     price: 69,
//     stock: 8,
//     genres: ["Sci-Fi", "Action"],
//     actors: ["Keanu Reeves", "Carrie-Anne Moss"],
//   },
//   {
//     id: 10,
//     title: "The Godfather",
//     posterPath: "https://via.placeholder.com/400x600",
//     price: 89,
//     stock: 3,
//     genres: ["Crime", "Drama"],
//     actors: ["Marlon Brando", "Al Pacino"],
//   },
// ];

export default function MoviesPage() {
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("default");

  const [movies, setMovies] = useState<Movie[]>([]);

  // Fetch movies on mount
  useEffect(() => {
    const fetch = async () => {
      const data = await FindMoviesByDirectors();
      setMovies(data);
    };
    fetch(); //Needed to be able to use async function inside useEffect
  }, []);

  // const allGenres = useMemo(() => {
  //   const genres = new Set<string>();
  //   movies.forEach((movie) =>
  //     movie.genres.forEach((genre) => genres.add(genre))
  //   );
  //   return Array.from(genres).sort();
  // }, [movies]);

  // const filteredMovies = useMemo(() => {
  //   let filtered = movies.filter(
  //     (movie) =>
  //       movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       movie.actors.some((actor) =>
  //         actor.toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //   );

  //   if (selectedGenre !== "all") {
  //     filtered = filtered.filter((movie) =>
  //       movie.genres.includes(selectedGenre)
  //     );
  //   }

  //   switch (sortOrder) {
  //     case "price-asc":
  //       return filtered.sort((a, b) => a.price - b.price);
  //     case "price-desc":
  //       return filtered.sort((a, b) => b.price - a.price);
  //     case "title-asc":
  //       return filtered.sort((a, b) => a.title.localeCompare(b.title));
  //     default:
  //       return filtered;
  //   }
  // }, [searchTerm, selectedGenre, sortOrder]);

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-sky-800 ">Our Movies</h1>
      <div className="mb-8 mt-8 grid text-gray-50  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
        {/* SÖK FÄLT */}
        <div className="w-full">
          <Label htmlFor="search">Search for movie or actor</Label>
          <Input
            id="search"
            type="text"
            placeholder="E.g., Inception, Tom Hanks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FILTRERA KATEGORI */}
        <div className="w-full">
          <Label htmlFor="genre-select">Select Genre</Label>
          <Select onValueChange={setSelectedGenre}>
            <SelectTrigger id="genre-select">
              <SelectValue placeholder="All Genres" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="all">All Genres</SelectItem>
              {allGenres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))} */}
            </SelectContent>
          </Select>
        </div>

        {/* SORTERING EFTER PRIS TITEL */}
        <div className="w-full">
          <Label htmlFor="sort-select">Sort by</Label>
          <Select onValueChange={setSortOrder}>
            <SelectTrigger id="sort-select">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price (Low to High)</SelectItem>
              <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* FILM GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movieData={movie} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No movies match your search.
          </p>
        )}
      </div>
    </main>
  );
}
