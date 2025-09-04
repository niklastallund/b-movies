"use client";

import Image from "next/image";
import MovieDetails from "@/components/MovieDetails";
import { FindCrewByMovieId, FindMoviesByDirectors } from "@/lib/tmdb";
import { getBackdropUrl } from "@/lib/tmdb-image-url";
import { Movie } from "@/lib/types";
import { useEffect, useState } from "react";
import { Person } from "moviedb-promise";

export default function MovieDetailsPage() {
  //THIS IS HARDCODED TO ALWAYS SHOW THE 5TH MOVIE, CHANGE LATER
  const [movies, setMovies] = useState<Movie[]>([]);
  const [crew, setCrew] = useState<{ crew: Person[]; cast: Person[] }>();

  // Fetch movies on mount
  useEffect(() => {
    const fetch = async () => {
      const movies = await FindMoviesByDirectors();
      setMovies(movies);
    };
    fetch(); //Needed to be able to use async function inside useEffect
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const crew = await FindCrewByMovieId("10513"); //Hardcoded to "Plan 9 from Outer Space"
      setCrew(crew);
    };
    fetch();
  }, []);

  const movie = movies[4];
  const tmpCrew = crew;

  console.log(tmpCrew);

  if (!movie) {
    return <div>Movie was not found.</div>;
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
