import { prisma } from "@/lib/prisma";
import { createPersonSchema, CreatePersonInput, UpdatePersonInput, updatePersonSchema } from "@/lib/zod-schemas";

export async function createPerson(person: CreatePersonInput) {
  // !!!!!!!!!!!!!!!!!!
  // !TODO auth checks!
  // !!!!!!!!!!!!!!!!!!

  const data = await createPersonSchema.parseAsync(person);

  const newPerson = await prisma.person.create({
    data: {
      tmdbId: data.tmdbId,
      name: data.name,
      birthday: data.birthday,
      deathday: data.deathday,
      biography: data.biography,
      profilePath: data.profilePath,
    },
  });

  return newPerson;
}

export async function updatePerson(person: UpdatePersonInput) {
  // !!!!!!!!!!!!!!!!!!
  // !TODO auth checks!
  // !!!!!!!!!!!!!!!!!! 

  const data = await updatePersonSchema.parseAsync(person);

  const updatedPerson = await prisma.person.update({
    where: { id: data.id },
    data: {
      tmdbId: data.tmdbId,
      name: data.name,
      birthday: data.birthday,
      deathday: data.deathday,
      biography: data.biography,
      profilePath: data.profilePath,
    },
  });

  return updatedPerson;
}


