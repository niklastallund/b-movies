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
import { useCartStore } from "@/store/cookie-cart";

import { getPosterUrl } from "@/lib/tmdb-image-url";
import { Genre, Movie, MovieCrew } from "@/generated/prisma";

// Props som komponenten tar emot
interface MovieDetailsProps {
  movie: Movie;
  genres: Genre[];
  cast: MovieCrew[];
  crew: MovieCrew[];
}
// Huvudkomponenten för filmdetaljer
export default function MovieDetails({
  movie,
  genres,
  cast,
  crew,
}: MovieDetailsProps) {
  // Tillstånd för att hålla reda på antalet filmer att lägga till
  const [quantity, setQuantity] = useState(1);

  // Cart store-funktion
  const addToCart = useCartStore((state) => state.addToCart);

  // Funktion för att minska antalet
  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // Funktion för att öka antalet
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handlePoster =
    getPosterUrl(movie.posterPath, "w500") || "/default-image.jpg";

  // Lägg till i varukorgen
  const handleAddToCart = () => {
    addToCart({
      id: movie.id,
      name: movie.title,
      price: movie.price,
      quantity: quantity,
      imageUrl: handlePoster,
    });
  };

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
            <CardDescription className="text-gray-200 text-base italic drop-shadow-sm">
              {genres.map((genre) => genre.name).join(", ")}
            </CardDescription>
          </CardHeader>

          <Separator className="mb-3 mt-0 bg-white/20" />
          <p className="mb-4 text-gray-400 leading-relaxed drop-shadow-sm italic">
            {movie.tagline}
          </p>
          <p className="mb-4 text-gray-100 leading-relaxed drop-shadow-sm">
            {movie.overview}
          </p>

          <div className="space-y-2 mb-4 text-gray-200">
            <p>
              Release Date:{" "}
              {movie.releaseDate
                ? movie.releaseDate.toLocaleDateString()
                : "Unknown"}
            </p>
            <p>{`Runtime: ${
              movie.runtime ? `${movie.runtime} minutes` : "Unknown"
            }`}</p>
            <p>{`Budget: ${movie.budget ? `$${movie.budget}` : "Unknown"}`}</p>
            <p>{`Revenue: ${movie.revenue ? movie.revenue : "Unknown"}`}</p>
          </div>

          <Separator className="mb-4 mt-0 bg-white/20" />

          <div className="flex items-center text-2xl font-semibold mb-4 text-white">
            Price: {movie.price} SEK
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
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </div>

          <p className="mt-4 text-sm text-gray-300">
            {(movie.stock ?? 0) > 0
              ? `${movie.stock} in stock`
              : "Out of stock"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
