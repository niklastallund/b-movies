"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPosterUrl } from "@/lib/tmdb-image-url";
import { Movie } from "@/generated/prisma";

interface MovieDetailsProps {
  movie: Movie;
}

// Component showing a card for a movie
export function MovieCard({ movie }: MovieDetailsProps) {
  if (!movie) return "Movie not found";

  const { posterPath, title, price, id, stock } = movie;

  const handlePoster =
    getPosterUrl(posterPath, "original") || "/default-image.jpg";

  const isAvailable = (stock ?? 0) > 0;

  return (
    <Card className="max-w-xs overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl py-3">
      <CardContent className="p-0">
        {/* Movie image */}
        <Image
          src={handlePoster}
          alt={title}
          width={400}
          height={620}
          style={{ objectFit: "cover" }}
          className="rounded-3xl px-3"
        />
      </CardContent>
      <CardFooter className="flex-col items-start px-4 py-0">
        {/* Movie title */}
        <h3 className="mb-2 text-md font-semibold leading-tight truncate w-full">
          {title}
        </h3>
        <div className="flex w-full items-center text-secondary justify-between">
          {/* Price */}
          <span className="text-md font-bold text-primary">{price} SEK</span>
        </div>
        {/* "Read more" link to the dynamic page */}
        <Link href={`/movies/${id}`} className="mt-4 w-full">
          <Button variant="outline" className="w-full" disabled={!isAvailable}>
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
