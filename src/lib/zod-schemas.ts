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

// User (endast de fält du använder i admin)
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable().optional(),
});

// Movie (endast de fält du visar i orderdetaljer)
export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
});

// OrderItem (relation mellan order och film)
export const orderItemSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  priceAtPurchase: z.number(),
  movie: movieSchema,
});

// Order (inklusive relationer)
export const orderSchema = z.object({
  id: z.number(),
  totalAmount: z.number(),
  status: z.string(),
  orderDate: z.string(),
  userId: z.string(),
  user: userSchema,
  createdAt: z.string(), // eller z.date()
  updatedAt: z.string(), // eller z.date()
  OrderItem: z.array(orderItemSchema),
});
