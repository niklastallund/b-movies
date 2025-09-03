"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  createGenreSchema,
  updateGenreSchema,
  deleteGenreSchema,
} from "@/lib/zod-schemas";

// --- Skapa en ny genre ---
export async function createGenre(formData: FormData) {
  const data = Object.fromEntries(formData);
  const validated = createGenreSchema.safeParse(data);

  if (!validated.success) {
    return { success: false, errors: validated.error.flatten().fieldErrors };
  }

  try {
    await prisma.genre.create({ data: validated.data });
    revalidatePath("/admin/genres");
    return { success: true };
  } catch (error) {
    return { success: false, errors: { _global: "Kunde inte skapa genren." } };
  }
}

// --- Uppdatera en befintlig genre ---
export async function updateGenre(formData: FormData) {
  const data = Object.fromEntries(formData);
  const validated = updateGenreSchema.safeParse({
    ...data,
    id: Number(data.id),
  });

  if (!validated.success) {
    return { success: false, errors: validated.error.flatten().fieldErrors };
  }

  try {
    await prisma.genre.update({
      where: { id: validated.data.id },
      data: validated.data,
    });
    revalidatePath("/admin/genres");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errors: { _global: "Kunde inte uppdatera genren." },
    };
  }
}

// --- Ta bort en genre ---
export async function deleteGenre(formData: FormData) {
  const data = Object.fromEntries(formData);
  const validated = deleteGenreSchema.safeParse({ id: Number(data.id) });

  if (!validated.success) {
    return { success: false, errors: validated.error.flatten().fieldErrors };
  }

  try {
    await prisma.genre.delete({ where: { id: validated.data.id } });
    revalidatePath("/admin/genres");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errors: { _global: "Kunde inte ta bort genren." },
    };
  }
}

export async function getAllGenres() {
  try {
    const genres = await prisma.genre.findMany();
    return genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return []; // Return an empty array on error
  }
}
