import PersonDetails from "@/components/person-details";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export type Params = {
  personId: string;
};

export default async function PersonPage(props: { params: Params }) {
  const params = props.params;
  const personId = parseInt(params.personId);

  if (isNaN(personId) || personId <= 0) {
    return redirect("/person");
  }

  const person = await prisma.person.findUnique({
    where: { id: personId },
  });

  if (!person) {
    return notFound();
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center">
      <PersonDetails person={person} />
    </main>
  );
}
