import { z } from "zod";

// --- Genre Schemas ---
export const createGenreSchema = z.object({
  name: z.string().min(1, { message: "Genrenamn är obligatoriskt." }),
  description: z.string().optional(),
});

export const updateGenreSchema = z.object({
  id: z.number().int().positive(),
  name: z
    .string()
    .min(1, { message: "Genrenamn är obligatoriskt." })
    .optional(),
  description: z.string().optional(),
});

export const deleteGenreSchema = z.object({
  id: z.number().int().positive(),
});

// --- Person Schemas ---
export const createPersonSchema = z.object({
  tmdbId: z.number().int().positive(),
  name: z.string().min(1),
  birthday: z.iso.date().optional(),
  deathday: z.iso.date().optional(),
  biography: z.string().optional(),
  profilePath: z.string().optional(),
});

export const updatePersonSchema = z.object({
  tmdbId: z.number().int().positive().optional(),
  name: z.string().min(1).optional(),
  birthday: z.iso.date().optional(),
  deathday: z.iso.date().optional(),
  biography: z.string().optional(),
  profilePath: z.string().optional(),
});

export const deletePersonSchema = z.object({
  id: z.number().int().positive(),
});

// --- Order Schemas ---
export const updateOrderStatusSchema = z.object({
  id: z.number().int().positive(),
  status: z.string().min(1, { message: "Status är obligatoriskt." }),
});

// --- Movies Shemas ---

// Aminas Kod för zod shema
