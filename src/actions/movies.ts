//Aminas

// src/actions/movies.ts

"use server";

import { revalidatePath } from "next/cache";
//import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  createMovieSchema,
  updateMovieSchema,
  deleteMovieSchema,
  CreateMovieInput,
  UpdateMovieInput,
} from "@/lib/zod-schemas";

// --- Skapa ny film ---
export async function createMovie(formData: CreateMovieInput) {
  const validated = await createMovieSchema.parseAsync(formData);
  //console.log(validated.releaseDate);

  const newMovie = await prisma.movie.create({
    data: {
      tmdbId: validated.tmdbId,
      title: validated.title,
      releaseDate: validated.releaseDate,
      runtime: validated.runtime,
      tagline: validated.tagline,
      overview: validated.overview,
      budget: validated.budget,
      revenue: validated.revenue,
      posterPath: validated.posterPath,
      backdropPath: validated.backdropPath,
      stock: validated.stock || 0,
      price: validated.price || 0,
    },
  });

  revalidatePath("/admin/movies");
  return newMovie;
}

// update movie
export async function updateMovie(formData: UpdateMovieInput) {
  const validated = await updateMovieSchema.parseAsync(formData);
  const updateMovie = await prisma.movie.update({
    where: { id: validated.id },
    data: {
      tmdbId: validated.tmdbId,
      title: validated.title,
      releaseDate: validated.releaseDate,
      runtime: validated.runtime,
      tagline: validated.tagline,
      overview: validated.overview,
      budget: validated.budget,
      revenue: validated.revenue,
      posterPath: validated.posterPath,
      backdropPath: validated.backdropPath,
      stock: validated.stock || 0,
      price: validated.price || 0,
    },
  });
  revalidatePath("/admin/movies");
  return updateMovie;
}

export async function deleteMovie(formData: FormData) {
  const validated = await deleteMovieSchema.parseAsync({
    id: Number(formData.get("id")),
  });

  await prisma.movie.delete({
    where: { id: validated.id },
  });

  revalidatePath("/admin/movies");
}

// // --- Uppdatera befintlig film ---
// export async function updateMovie(
//   prevState: FormState,
//   formData: any
// ): Promise<FormState> {
//   const data = formData;
//   const validated = updateMovieSchema.safeParse({
//     ...data,
//     id: Number(data.id),
//   });

//   if (!validated.success) {
//     return { success: false, errors: validated.error.flatten().fieldErrors };
//   }

//   try {
//     await prisma.movie.update({
//       where: { id: validated.data.id },
//       data: {
//         title: validated.data.title,
//         overview: validated.data.overview,
//         releaseDate: validated.data.releaseDate
//           ? new Date(validated.data.releaseDate)
//           : undefined,
//         price: validated.data.price,
//         stock: validated.data.stock,
//       },
//     });
//     revalidatePath("/admin/movies");
//     return { success: true, errors: {} };
//   } catch (error) {
//     return {
//       success: false,
//       errors: { _global: ["Kunde inte uppdatera filmen."] },
//     };
//   }
// }

// // --- Ta bort film ---
// export async function deleteMovie(formData: FormData): Promise<FormState> {
//   const validated = deleteMovieSchema.safeParse({
//     id: Number(formData.get("id")),
//   });

//   if (!validated.success) {
//     return { success: false, errors: validated.error.flatten().fieldErrors };
//   }

//   try {
//     await prisma.movie.delete({ where: { id: validated.data.id } });
//     revalidatePath("/admin/movies");
//     return { success: true, errors: {} };
//   } catch (error) {
//     return {
//       success: false,
//       errors: { _global: ["Kunde inte ta bort filmen."] },
//     };
//   }
// }

// // --- Hämta alla filmer ---
// export async function getAllMovies() {
//   try {
//     const movies = await prisma.movie.findMany({
//       orderBy: { title: "asc" },
//     });
//     return movies;
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     return [];
//   }
// }
