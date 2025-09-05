"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; // Bra för att skapa avdelare
import { Movie } from "@/lib/types";
import { getPosterUrl } from "@/lib/tmdb-image-url";

// Props som komponenten tar emot
interface MovieDetailsProps {
  movie: Movie;
}

// Huvudkomponenten för filmdetaljer
export default function MovieDetails({ movie }: MovieDetailsProps) {
  // Tillstånd för att hålla reda på antalet filmer att lägga till
  const [quantity, setQuantity] = useState(1);

  // Funktion för att minska antalet
  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // Funktion för att öka antalet
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handlePoster = getPosterUrl(movie.posterPath) || "/default-image.jpg";
  
  return (
    <Card className="w-full mx-auto relative bg-black/20 backdrop-blur-xs border-red-900">
      <CardContent className="relative z-10 flex flex-col md:flex-row p-4 md:p-8">
        {/* Vänster Sektion: Bild */}
        <div className="w-full md:w-1/2 flex items-center justify-center mb-4 md:mb-0 md:pr-4">
          <div className="relative w-full h-auto max-w-sm flex justify-center items-center">
            <Image
              src={handlePoster}
              alt={movie.title}
              width={400}
              height={600}
              className="rounded-lg shadow-2xl ring-1 ring-white/20"
            />
          </div>
        </div>

        {/* Höger Sektion: Text och "Lägg i varukorgen" */}
        <div className="w-full md:w-1/2 flex flex-col md:pl-4">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-4xl font-bold mb-2 text-white drop-shadow-lg">
              {movie.title}
            </CardTitle>
            {/* SÄTT TAGLINE HÄR */}
            <CardDescription className="text-gray-200 text-base">
              Release Date: {movie.releaseDate ?? "Okänt datum"}
            </CardDescription>
          </CardHeader>

          <p className="mb-4 text-gray-400 leading-relaxed drop-shadow-sm italic">
            {movie.tagline}
          </p>
          <p className="mb-4 text-gray-100 leading-relaxed drop-shadow-sm">
            {movie.overview}
          </p>

          <div className="space-y-2 mb-4 text-gray-200">
            <p>{`Runtime: ${
              movie.runtime ? `${movie.runtime} minutes` : "Unknown"
            }`}</p>
            <p>{`Budget: ${movie.budget ? `$${movie.budget}` : "Unknown"}`}</p>
            <p>{`Revenue: ${movie.revenue ? movie.revenue : "Unknown"}`}</p>
          </div>

          <Separator className="my-4 bg-white/20" />

          <div className="flex items-center text-2xl font-semibold mb-4 text-white">
            Price: ${100}
          </div>

          {/* Antal och Lägg till i varukorgen-knapp */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-white/30 rounded-md bg-black/20 backdrop-blur-sm">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="border-0 bg-transparent text-white hover:bg-white/10"
              >
                -
              </Button>
              <span className="px-4 text-white">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrease}
                className="border-0 bg-transparent text-white hover:bg-white/10"
              >
                +
              </Button>
            </div>
            <Button
              className="flex-[0.5] bg-white text-black hover:bg-gray-200 font-semibold shadow-lg"
              disabled={movie.stock === 0}
            >
              Add to cart
            </Button>
          </div>

          <p className="mt-4 text-sm text-gray-300">
            Balance:{" "}
            {(movie.stock ?? 0) > 0 ? `${movie.stock} i lager` : "Slut i lager"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
