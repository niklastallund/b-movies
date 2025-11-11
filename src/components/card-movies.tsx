"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPosterUrl } from "@/lib/tmdb-image-url";
import { Movie } from "@/generated/prisma";
import { addToCart } from "@/cart/actions";
import { ShoppingCart, Loader2, Plus } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MovieDetailsProps {
  movie: Movie;
}

// Component showing a card for a movie
export function MovieCard({ movie }: MovieDetailsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (!movie) return "Movie not found";

  const { posterPath, title, price, id, stock } = movie;

  const handlePoster =
    getPosterUrl(posterPath, "original") || "/default-image.jpg";

  const isAvailable = (stock ?? 0) > 0;

  const handleAddToCart = () => {
    startTransition(async () => {
      try {
        await addToCart({
          id: id,
          name: title,
          price: price ?? 0,
          quantity: 1,
          imageUrl: handlePoster,
          tmdb: false,
        });
        toast.success(`${title} added to cart!`);
        router.refresh();
      } catch {
        toast.error("Failed to add to cart. Please try again.");
      }
    });
  };

  return (
    <Card className="flex flex-col h-full max-w-xs overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl py-3">
      <CardContent className="p-0">
        {/* Fixed aspect-ratio image container to normalize height */}
        <div className="relative w-full aspect-[2/3] px-3">
          <Image
            src={handlePoster}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            className="rounded-3xl object-cover"
            priority={false}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex-col items-start px-4 py-0">
        <h3 className="mb-2 text-md font-semibold leading-tight truncate w-full">
          {title}
        </h3>
        <div className="flex w-full items-center justify-between mb-3">
          <span className="text-md font-bold text-primary">{price} SEK</span>
          <Button
            onClick={handleAddToCart}
            disabled={!isAvailable || isPending}
            size="sm"
            variant={isAvailable ? "default" : "secondary"}
            className="h-8 px-3"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                <ShoppingCart className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
        <Link href={`/movies/${id}`} className="w-full">
          <Button variant="outline" className="w-full" disabled={!isAvailable}>
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
