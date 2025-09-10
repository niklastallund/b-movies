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
  tmdbId: z.coerce.number<number>().positive().optional(),
  name: z.string().min(1),
  birthday: z.date().optional(),
  deathday: z.date().optional(),
  biography: z.string().optional(),
  profilePath: z.string().optional(),
});

export type CreatePersonInput = z.infer<typeof createPersonSchema>;

export const updatePersonSchema = z.object({
  id: z.coerce.number<number>().positive().optional(),
  tmdbId: z.coerce.number<number>().positive().optional(),
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

export const createMovieSchema = z.object({
  tmdbId: z.coerce.number<number>().positive().optional(),
  title: z.string().min(1, { message: "Titel är obligatoriskt." }),
  overview: z.string().optional(),
  tagline: z.string().optional(),
  releaseDate: z.date().optional(),
  budget: z.coerce.number<number>().positive().optional(),
  revenue: z.coerce.number<number>().positive().optional(),
  runtime: z.coerce.number<number>().positive().optional(),
  price: z.coerce.number<number>().positive().optional(),
  stock: z.coerce.number<number>().int().optional(),
  posterPath: z.string().optional(),
  backdropPath: z.string().optional(),
});

export type CreateMovieInput = z.infer<typeof createMovieSchema>;
//Update
export const updateMovieSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1, { message: "Titel är obligatoriskt." }).optional(),
  ove: z.string().optional(),
  releaseDate: z.string().optional(),
  genreIds: z.array(z.number().int().positive()).optional(),
  actorIds: z.array(z.number().int().positive()).optional(),
  directorIds: z.array(z.number().int().positive()).optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().min(0).optional(),
});

//Delete
// För att ta bort filmen krävs bara id och den numret ska vara positiv
export const deleteMovieSchema = z.object({
  id: z.number().int().positive(),
});
