"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Används för att matcha fälten i din Prisma-databas
type Movie = {
  id: number;
  imageURL: string;
  title: string;
  price: number;
  stock: number;
};

// Props för komponenten
interface MovieCardProps {
  movieData: Movie;
}

// Komponenten som visar ett filmkort
export function MovieCard({ movieData }: MovieCardProps) {
  const { imageURL, title, price, id, stock } = movieData;

  // Enkelt exempel på hur du kan hantera tillgänglighet
  const isAvailable = stock > 0;

  return (
    <Card className="max-w-xs overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardContent className="p-0">
        {/* Filmens bild */}
        <Image
          src={imageURL}
          alt={title}
          width={400}
          height={620}
          style={{ objectFit: "cover" }}
          className="rounded-t-lg p-2"
        />
      </CardContent>
      <CardFooter className="flex-col items-start p-4">
        {/* Filmtitel */}
        <h3 className="mb-2 text-md font-semibold leading-tight">{title}</h3>
        <div className="flex w-full items-center justify-between">
          {/* Pris */}
          <span className="text-md font-bold text-primary">{price} SEK</span>
          {/* +- knappar för antal */}
          <div className="flex space-x-2">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 text-lg"
              disabled={!isAvailable}
            >
              -
            </Button>
            <Button
              size="icon"
              className="h-8 w-8 text-lg"
              disabled={!isAvailable}
            >
              +
            </Button>
          </div>
        </div>
        {/* "Läs mer"-länk till den dynamiska sidan */}
        <Link href={`/movies/${id}`} className="mt-4 w-full">
          <Button variant="outline" className="w-full" disabled={!isAvailable}>
            Läs mer
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
