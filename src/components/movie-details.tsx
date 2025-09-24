"use client";
// If someone really wants to this can be rewritten to a server component

import Image from "next/image";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { addToCart } from "@/cart/actions";
import { useRouter } from "next/navigation";

import { getPosterUrl } from "@/lib/tmdb-image-url";
import { Genre, Movie, MovieCrew, Person } from "@/generated/prisma";
import { EditMoviePopup } from "./edit-movie-popup";
import MovieDetailsCarousel from "./movie-details-carousel";

// Extended type so we can include person details
export type MovieCrewWithPerson = MovieCrew & { person: Person };

interface MovieDetailsProps {
  movie: Movie;
  movieCrew: MovieCrewWithPerson[];
  genres: Genre[];
  allGenres: Genre[];
  admin: boolean;
}

// Main component for movie details
export default function MovieDetails({
  movie,
  movieCrew,
  genres,
  allGenres,
  admin,
}: MovieDetailsProps) {
  // State to keep track of the number of movies to add
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Function to decrease the quantity
  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // Function to increase the quantity
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handlePoster =
    getPosterUrl(movie.posterPath, "w500") || "/default-image.jpg";

  // Add to cart
  const handleAddToCart = () => {
    startTransition(async () => {
      await addToCart({
        id: movie.id,
        name: movie.title,
        price: movie.price,
        quantity: quantity,
        imageUrl: handlePoster,
      });
      router.refresh();
    });
  };

  return (
    <Card className="w-full mx-auto relative bg-background/20 backdrop-blur-xs border-border">
      {admin && (
        <div className="absolute top-4 right-4 z-20">
          <EditMoviePopup
            movie={movie}
            allGenres={allGenres ?? []}
            initialSelectedIds={genres.map((g) => g.id)}
          />
        </div>
      )}
      <CardContent className="relative z-10 flex flex-col md:flex-row p-4 md:p-8">
        {/* Left Section: Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center mb-4 md:mb-0 md:pr-4">
          <div className="relative w-full h-auto max-w-sm flex justify-center items-center">
            <Image
              src={handlePoster}
              alt={movie.title}
              width={400}
              height={600}
              className="rounded-lg shadow-2xl ring-1 ring-border"
            />
          </div>
        </div>

        {/* Right Section: Text and "Add to cart" */}
        <div className="w-full md:w-1/2 flex flex-col md:pl-4">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-4xl font-bold mb-2 text-foreground drop-shadow-lg">
              {movie.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base italic drop-shadow-sm">
              {genres.map((genre) => genre.name).join(", ")}
            </CardDescription>
          </CardHeader>

          <Separator className="mb-3 mt-0 bg-border" />
          <p className="mb-4 text-muted-foreground leading-relaxed drop-shadow-sm italic">
            {movie.tagline}
          </p>
          <p className="mb-4 text-foreground leading-relaxed drop-shadow-sm">
            {movie.overview}
          </p>

          <div className="space-y-2 mb-4 text-foreground">
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

          <Separator className="mb-4 mt-0 bg-border" />

          <div className="flex items-center text-2xl font-semibold mb-4 text-foreground">
            Price: {movie.price} SEK
          </div>

          {/* Quantity and Add to cart button */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-border rounded-md bg-background/20 backdrop-blur-sm">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="border-0 bg-transparent text-foreground hover:bg-muted/10"
              >
                -
              </Button>
              <span className="px-4 text-foreground">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrease}
                className="border-0 bg-transparent text-foreground hover:bg-muted/10"
              >
                +
              </Button>
            </div>
            <Button
              className="flex-[0.5] bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-lg"
              disabled={movie.stock === 0 || isPending}
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            {(movie.stock ?? 0) > 0
              ? `${movie.stock} in stock`
              : "Out of stock"}
          </p>
        </div>
      </CardContent>
      {/* Carousel at the bottom, full width */}
      <div className="w-full">
        <MovieDetailsCarousel movieCrew={movieCrew} />
      </div>
    </Card>
  );
}
