//src\actions\genres.ts

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  createGenreSchema,
  updateGenreSchema,
  deleteGenreSchema,
} from "@/lib/zod-schemas";
import { requireAdmin } from "@/lib/auth";

// Typ för formulärfel
interface FormErrors {
  _global?: string[];
  name?: string[];
  description?: string[];
  id?: string[];
}

interface FormState {
  success: boolean;
  errors: FormErrors;
}

// --- Skapa ny genre ---
// OBS! Med useActionState (React 19) får du ett objekt, inte FormData!
export async function createGenre(formData: any): Promise<FormState> {
  //Authorization
  await requireAdmin();

  const data = formData; // formData är redan ett objekt
  const validated = createGenreSchema.safeParse(data);

  if (!validated.success) {
    return { success: false, errors: validated.error.flatten().fieldErrors };
  }

  try {
    await prisma.genre.create({ data: validated.data });
    revalidatePath("/admin/genres");
    redirect("/admin/genres"); // Navigera om så listan uppdateras direkt
  } catch (error) {
    return {
      success: false,
      errors: {
        _global: [
          "Kunde inte skapa genren. Kontrollera om namnet redan finns.",
        ],
      },
    };
  }
}

// --- Uppdatera befintlig genre ---
export async function updateGenre(
  prevState: FormState,
  formData: any
): Promise<FormState> {

 //Authorization
  await requireAdmin();

  const data = formData;
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
    return { success: true, errors: {} };
  } catch (error) {
    return {
      success: false,
      errors: { _global: ["Kunde inte uppdatera genren."] },
    };
  }
}

// --- Ta bort genre ---
export async function deleteGenre(formData: FormData): Promise<FormState> {

 //Authorization
  await requireAdmin();

  const validated = deleteGenreSchema.safeParse({
    id: Number(formData.get("id")),
  });

  if (!validated.success) {
    return { success: false, errors: validated.error.flatten().fieldErrors };
  }

  try {
    await prisma.genre.delete({ where: { id: validated.data.id } });
    revalidatePath("/admin/genres");
    return { success: true, errors: {} };
  } catch (error) {
    return {
      success: false,
      errors: { _global: ["Kunde inte ta bort genren."] },
    };
  }
}

// --- Hämta alla genrer ---
export async function getAllGenres() {
  try {
    const genres = await prisma.genre.findMany({
      orderBy: { name: "asc" },
    });
    return genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
}
