import PersonDetails from "@/components/person-details";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
// import { LinkPersonToMovieForm } from "@/components/forms/link-person-to-movie-form";

export type Params = {
  personId: string;
};

export default async function PersonPage(props: { params: Params }) {
  const params = await props.params;
  const personId = parseInt(params.personId);

  if (isNaN(personId) || personId <= 0) {
    return redirect("/person");
  }

  const person = await prisma.person.findUnique({
    where: { id: personId },
    include: { movieCrew: { include: { movie: true } } },
  });

  if (!person) {
    return notFound();
  }

  console.log(person);

  return (
    <main className="relative min-h-screen flex items-center justify-center">
      <PersonDetails person={person} workedOn={person.movieCrew} />
      {/* Admin-only: Place LinkPersonToMovieForm next to an Edit panel when authenticated as admin */}
      {/* <div className="fixed bottom-6 right-6 w-[380px]">
        <LinkPersonToMovieForm personId={person.id} />
      </div> */}
    </main>
  );
}
