import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProfileUrl } from "@/lib/tmdb-image-url";
import { Person } from "@/generated/prisma";

interface PersonDetailsProps {
  person: Person;
}

function getAgeAtDeath(birthday: Date, deathday: Date): number {
  let age = deathday.getFullYear() - birthday.getFullYear();
  const deathMonth = deathday.getMonth();
  const birthMonth = birthday.getMonth();
  const deathDate = deathday.getDate();
  const birthDate = birthday.getDate();

  // If deathday is before birthday in the year, subtract one
  if (
    deathMonth < birthMonth ||
    (deathMonth === birthMonth && deathDate < birthDate)
  ) {
    age--;
  }
  return age;
}

export default function PersonDetails({ person }: PersonDetailsProps) {
  const handlePoster =
    getProfileUrl(person.profilePath, "h632") || "/images/default-profile.png";

  return (
    <Card className="w-full mx-auto relative bg-black/20 backdrop-blur-xs border-red-900">
      <CardContent className="relative z-10 flex flex-col md:flex-row p-4 md:p-8">
        <div className="w-full md:w-1/2 flex items-center justify-center mb-4 md:mb-0 md:pr-4">
          <div className="relative w-full h-auto max-w-sm flex justify-center items-center">
            <Image
              src={handlePoster}
              alt={person.name}
              width={400}
              height={600}
              className="rounded-lg shadow-2xl ring-1 ring-white/20"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col md:pl-4">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-4xl font-bold mb-2 text-white drop-shadow-lg">
              {person.name}
            </CardTitle>
            <CardDescription className="text-gray-200 text-base">
              <Separator className="my-4 bg-white/20" />
              <p>
                Birthdate:{" "}
                {person.birthday
                  ? person.birthday.toLocaleDateString()
                  : "Unknown"}
              </p>
              {person.deathday
                ? `Day of death: ${person.deathday?.toLocaleDateString()} (aged ${
                    person.birthday
                      ? getAgeAtDeath(person.birthday, person.deathday)
                      : "unknown"
                  })`
                : ""}
            </CardDescription>
          </CardHeader>
          <CardFooter className="p-0 mb-4">
            <p className="mb-4 text-gray-100 leading-relaxed drop-shadow-sm">
              {person.biography || "No biography available."}
            </p>
          </CardFooter>

          <Separator className="my-4 bg-white/20" />
        </div>
      </CardContent>
    </Card>
  );
}
