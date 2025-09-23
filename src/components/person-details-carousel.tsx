"use client";

import React from "react";
import { MovieCrewWithMovie } from "./person-details";
import { PersonDetailsMovieCard } from "./person-details-movie-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface PersonDetailsCarouselProps {
  workedOn: MovieCrewWithMovie[];
}

// Combine job/character entries per movie and merge field strings
// Niklas: This one is absolutely cursed and I have no idea how it works, ask GPT-5
function mergeByMovie<T extends MovieCrewWithMovie, K extends keyof T>(
  items: T[],
  mergeField: K
): T[] {
  return Object.values(
    items.reduce((acc, item) => {
      const id = item.movie.id;
      const existing = acc[id];
      if (existing) {
        const merged = new Set([
          ...((typeof existing[mergeField] === "string"
            ? (existing[mergeField] as string).split(", ").filter(Boolean)
            : []) as string[]),
          ...((typeof item[mergeField] === "string"
            ? (item[mergeField] as string).split(", ").filter(Boolean)
            : []) as string[]),
        ]);
        (existing[mergeField] as T[K]) = Array.from(merged).join(", ") as T[K];
      } else {
        acc[id] = { ...item };
      }
      return acc;
    }, {} as Record<number, T>)
  );
}

// Component for displaying a carousel of movies on the person details page
export default function PersonDetailsCarousel({
  workedOn,
}: PersonDetailsCarouselProps) {
  const castMovies = mergeByMovie(
    workedOn.filter((item) => item.role === "CAST"),
    "character"
  );
  const crewMovies = mergeByMovie(
    workedOn.filter((item) => item.role === "CREW"),
    "job"
  );

  return (
    <div className="my-8 px-10">
      {castMovies.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Starred In
          </h2>
          <Carousel className="w-full max-w-7xl mx-auto">
            <CarouselContent className="-ml-1">
              {castMovies.map((movie) => (
                <CarouselItem
                  key={movie.id}
                  className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/5"
                >
                  <PersonDetailsMovieCard workedOn={movie} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </>
      )}

      {crewMovies.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-foreground">Worked On</h2>
          <Carousel className="w-full max-w-7xl mx-auto">
            <CarouselContent className="-ml-1">
              {crewMovies.map((movie) => (
                <CarouselItem
                  key={movie.id}
                  className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/5"
                >
                  <PersonDetailsMovieCard workedOn={movie} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </>
      )}
    </div>
  );
}
