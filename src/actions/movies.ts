//Aminas

// src/actions/movies.ts

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  createMovieSchema,
  updateMovieSchema,
  deleteMovieSchema,
  CreateMovieInput,
  UpdateMovieInput,
} from "@/lib/zod-schemas";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// --- Skapa ny film ---
export async function createMovie(formData: CreateMovieInput) {
  //Authorization
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

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