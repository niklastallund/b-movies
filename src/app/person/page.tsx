import { PersonCard } from "@/components/card-person";
import SearchBar from "@/components/search-bar";
import { prisma } from "@/lib/prisma";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// This page is similar to the MoviesPage but for persons
// It includes a search bar and displays persons in a grid layout
// The search functionality filters persons by name
export default async function PersonPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const params = await searchParams;

  // Extract and sanitize query parameters
  const query = params.q || "";
  const page = parseInt(params.page || "1");

  // Pagination settings
  const PAGE_SIZE = 18;
  const currentPage = Math.max(1, page); // Avoid pages less than 1

  const persons = await prisma.person.findMany({
    orderBy: { name: "asc" },
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const totalPersons = await prisma.person.count({
    orderBy: { name: "asc" },
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  const totalPages = Math.ceil(totalPersons / PAGE_SIZE);

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-sky-800 ">People</h1>
      <div className="mb-8 mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
        <div className="w-full">
          <SearchBar />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-6">
        {persons.length > 0 ? (
          persons.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No person matches your search.
          </p>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8 flex justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?${new URLSearchParams({
                  ...params,
                  page: String(currentPage - 1),
                })}`}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href={`?${new URLSearchParams({
                    ...params,
                    page: String(i + 1),
                  })}`}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={`?${new URLSearchParams({
                  ...params,
                  page: String(currentPage + 1),
                })}`}
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </main>
  );
}
