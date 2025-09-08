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
  tmdbId: z.string().optional(),
  name: z.string().min(1),
  birthday: z.date().optional(),
  deathday: z.date().optional(),
  biography: z.string().optional(),
  profilePath: z.string().optional(),
});

export type CreatePersonInput = z.infer<typeof createPersonSchema>;

export const updatePersonSchema = z.object({
  id: z.number().positive(),
  tmdbId: z.number().optional(),
  name: z.string().optional(),
  birthday: z.date().optional(),
  deathday: z.date().optional(),
  biography: z.string().optional(),
  profilePath: z.string().optional(),
});

export type UpdatePersonInput = z.infer<typeof updatePersonSchema>;

export const deletePersonSchema = z.object({
  id: z.number().int().positive(),
});

export type DeletePersonInput = z.infer<typeof deletePersonSchema>;

// --- Order Schemas ---
export const updateOrderStatusSchema = z.object({
  id: z.number().int().positive(),
  status: z.string().min(1, { message: "Status är obligatoriskt." }),
});

// --- Movies Shemas ---

// Aminas Kod för zod shema
