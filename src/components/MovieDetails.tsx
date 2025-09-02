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

// Gränssnitt för filmdata som matchar din Prisma-modell
interface Movie {
  id: number;
  title: string;
  releaseDate: Date | null;
  runtime?: number | null;
  budget?: number | null;
  revenue?: number | null;
  description?: string | null;
  imageURL: string;
  price: number;
  stock: number;
}

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

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardContent className="flex flex-col md:flex-row p-4 md:p-8">
        {/* Vänster Sektion: Bild */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-4 md:mb-0 md:pr-4">
          <div className="relative w-full h-auto max-w-sm">
            <Image
              src={movie.imageURL}
              alt={movie.title}
              width={400}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Höger Sektion: Text och "Lägg i varukorgen" */}
        <div className="w-full md:w-1/2 flex flex-col md:pl-4">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-4xl font-bold mb-2">
              {movie.title}
            </CardTitle>

            {/* SÄTT TAGLINE HÄR */}

            <CardDescription className="text-gray-600">
              Releasedatum:{" "}
              {movie.releaseDate?.toLocaleDateString() ?? "Okänt datum"}
            </CardDescription>
          </CardHeader>

          <p className="mb-4">{movie.description}</p>

          {/* Villkorlig rendering för valfria fält */}
          <div className="space-y-2 mb-4">
            {movie.runtime && <p>Runtime: {movie.runtime} minutes</p>}
            {movie.budget && <p>Budget: ${movie.budget}</p>}
            {movie.revenue && <p>Revenue: ${movie.revenue}</p>}
          </div>

          <Separator className="my-4" />

          <div className="flex items-center text-2xl font-semibold mb-4">
            Price: ${movie.price}
          </div>

          {/* Antal och Lägg till i varukorgen-knapp */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrease}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="px-4">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrease}
                disabled={quantity >= movie.stock}
              >
                +
              </Button>
            </div>
            <Button className="flex-1" disabled={movie.stock === 0}>
              Lägg till i varukorgen
            </Button>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Balance:{" "}
            {movie.stock > 0 ? `${movie.stock} i lager` : "Slut i lager"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
