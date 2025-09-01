import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function MovieCard({ movieData }) {
  const { imageUrl, title, price, slug } = movieData;

  return (
    <Card className="max-w-xs overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardContent className="p-0">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={620}
          objectFit="cover"
          className="rounded-t-lg p-2"
        />
      </CardContent>
      <CardFooter className="flex-col items-start p-4">
        <h3 className="mb-2 text-md font-semibold leading-tight">{title}</h3>
        <div className="flex w-full items-center justify-between">
          <span className="text-md font-bold text-primary">{price} SEK</span>
          <div className="flex space-x-2">
            <Button size="icon" variant="outline" className="h-8 w-8 text-lg">
              -
            </Button>
            <Button size="icon" className="h-8 w-8 text-lg">
              +
            </Button>
          </div>
        </div>
        <Link href={`/movies/${slug}`} passHref className="mt-4 w-full">
          <Button variant="outline" className="w-full">
            Läs mer
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
