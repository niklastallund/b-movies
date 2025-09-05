"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  createPersonSchema,
  updatePersonSchema,
  deletePersonSchema,
} from "@/lib/zod-schemas";

// --- Skapa en ny person (skådespelare/regissör) ---
export async function createPerson(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData);
  const validated = createPersonSchema.safeParse(data);

  if (!validated.success) {
    return { success: false, errors: validated.error.flatten().fieldErrors };
  }

  try {
    // TMDB-id måste vara unikt, så vi hanterar det
    await prisma.person.create({
      data: {
        tmdbId: validated.data.tmdbId,
        name: validated.data.name,
        biography: validated.data.biography,
        // Konvertera birthday-strängen till ett Date-objekt om den finns
        birthday: validated.data.birthday
          ? new Date(validated.data.birthday)
          : undefined,
      },
    });
    revalidatePath("/admin/people");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errors: {
        _global:
          "Kunde inte skapa personen. Kontrollera om TMDB ID redan finns.",
      },
    };
  }
}

// --- Uppdatera en befintlig person ---
export async function updatePerson(formData: FormData) {
  const data = Object.fromEntries(formData);
  const validated = updatePersonSchema.safeParse({
    ...data,
    id: Number(data.id),
  });

  if (!validated.success) {
    return { success: false, errors: validated.error.flatten().fieldErrors };
  }

  try {
    const { id, birthday, ...updateData } = validated.data;
    await prisma.person.update({
      where: { id },
      data: {
        ...updateData,
        birthday: birthday ? new Date(birthday) : undefined,
      },
    });
    revalidatePath("/admin/people");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errors: { _global: "Kunde inte uppdatera personen." },
    };
  }
}

// --- Ta bort en person ---
export async function deletePerson(formData: FormData) {
  const data = Object.fromEntries(formData);
  const validated = deletePersonSchema.safeParse({ id: Number(data.id) });

  if (!validated.success) {
    return { success: false, errors: validated.error.flatten().fieldErrors };
  }

  try {
    await prisma.person.delete({ where: { id: validated.data.id } });
    revalidatePath("/admin/people");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errors: { _global: "Kunde inte ta bort personen." },
    };
  }
}

// --- Funktion för att hämta alla personer ---
export async function getAllPeople() {
  try {
    const people = await prisma.person.findMany({
      orderBy: { name: "asc" },
    });
    return people;
  } catch (error) {
    console.error("Kunde inte hämta personer:", error);
    return [];
  }
}
