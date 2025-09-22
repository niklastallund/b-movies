//Aminas

// src/actions/movies.ts

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
//import { redirect } from "next/navigation";
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

// --- Hämta alla filmer ---
export async function getAllMovies() {
  return await prisma.movie.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// --- Uppdatera filmens genrer ---
export async function updateMovieGenresAction(formData: FormData) {
  const movieIdRaw = formData.get("movieId");
  const selected = formData.getAll("genreIds");

  const movieId = Number(movieIdRaw);
  if (!Number.isInteger(movieId) || movieId <= 0) {
    throw new Error("Invalid movieId");
  }

  const genreIds = selected
    .map((v) => Number(v))
    .filter((n) => Number.isInteger(n) && n > 0);

  await prisma.movie.update({
    where: { id: movieId },
    data: {
      genres: {
        set: genreIds.map((id) => ({ id })),
      },
    },
  });

  revalidatePath(`/movies/${movieId}`);
  revalidatePath("/movies");
  revalidatePath("/admin/movies");
}

// --- Search movies by title (for client-side pickers) ---
export async function searchMoviesByTitle(query: string, limit = 10) {
  const q = query.trim();
  if (!q) return [] as { id: number; title: string; subtitle?: number }[];

  const movies = await prisma.movie.findMany({
    where: { title: { contains: q, mode: "insensitive" } },
    orderBy: { title: "asc" },
    select: { id: true, title: true, releaseDate: true },
    take: Math.min(20, Math.max(1, limit)),
  });

  return movies.map((m) => ({
    id: m.id,
    title: m.title,
    subtitle: m.releaseDate ? new Date(m.releaseDate).getFullYear() : undefined,
  }));
}
