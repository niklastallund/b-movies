import { PersonCard } from "@/components/card-person";
import SearchBar from "@/components/search-bar";
import { prisma } from "@/lib/prisma";

export default async function PersonPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  const persons = await prisma.person.findMany({
    orderBy: { name: "asc" },
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-sky-800 ">Persons</h1>
      <div className="mb-8 mt-8 grid text-gray-50  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
        <div className="w-full">
          <SearchBar />
        </div>
      </div>

      {/* FILM GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-6">
        {persons.length > 0 ? (
          persons.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No movies match your search.
          </p>
        )}
      </div>
    </main>
  );
}
