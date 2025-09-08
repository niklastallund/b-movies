"use server";
import { prisma } from "@/lib/prisma";
import {
  createPersonSchema,
  CreatePersonInput,
  UpdatePersonInput,
  updatePersonSchema,
} from "@/lib/zod-schemas";

// !!!!!!!!!!!!!!!!!!
// !TODO auth checks!
// !!!!!!!!!!!!!!!!!!
export async function createPerson(person: CreatePersonInput) {
  const data = await createPersonSchema.parseAsync(person);

  const newPerson = await prisma.person.create({
    data: {
      tmdbId: data.tmdbId !== undefined ? Number(data.tmdbId) : undefined,
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
  const data = await updatePersonSchema.parseAsync(person);

  const updatedPerson = await prisma.person.update({
    where: { id: data.id },
    data: {
      tmdbId: data.tmdbId !== undefined ? Number(data.tmdbId) : undefined,
      name: data.name,
      birthday: data.birthday,
      deathday: data.deathday,
      biography: data.biography,
      profilePath: data.profilePath,
    },
  });

  return updatedPerson;
}

export async function deletePerson(id: number) {
  const deletedPerson = await prisma.person.delete({
    where: { id },
  });

  return deletedPerson;
}

export async function getAllPersons() {
  const persons = await prisma.person.findMany();
  return persons;
}

export async function getPersonById(id: number) {
  const person = await prisma.person.findUnique({
    where: { id },
  });
  return person;
}

export async function getPersonByTmdbId(tmdbId: number) {
  const person = await prisma.person.findUnique({
    where: { tmdbId },
  });
  return person;
}

export async function getPersonsByName(name: string) {
  const persons = await prisma.person.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
  });
  return persons;
}

export default function getPersonsByBirthday(birthday: Date) {
  return prisma.person.findMany({
    where: {
      birthday: birthday,
    },
  });
}
