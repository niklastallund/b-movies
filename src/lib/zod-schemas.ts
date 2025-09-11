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

// --- Person Schemas (för Person/Actor/Director) ---
export const createPersonSchema = z.object({
  tmdbId: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val) && val > 0, { message: "Ogiltigt TMDB ID." }),
  name: z.string().min(1, { message: "Namn är obligatoriskt." }),
  birthday: z.string().optional(), // Hantera datum som sträng från formulär
  biography: z.string().optional(),
});

export const updatePersonSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, { message: "Namn är obligatoriskt." }).optional(),
  birthday: z.string().optional(),
  biography: z.string().optional(),
});

export const deletePersonSchema = z.object({
  id: z.number().int().positive(),
});

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
