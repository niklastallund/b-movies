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

// --- Movies Shemas ---
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
  stock: z.coerce.number<number>().int().min(0).optional(),
  posterPath: z.string().optional(),
  backdropPath: z.string().optional(),
});

export type CreateMovieInput = z.infer<typeof createMovieSchema>;

//Update
export const updateMovieSchema = z.object({
  tmdbId: z.coerce.number<number>().positive().optional(),
  id: z.number().int().positive(),
  title: z.string().min(1, { message: "Titel är obligatoriskt." }).optional(),
  overview: z.string().optional(),
  tagline: z.string().optional(),
  releaseDate: z.date().optional(),
  // genreIds: z.array(z.number().int().positive()).optional(),
  //actorIds: z.array(z.number().int().positive()).optional(),
  //directorIds: z.array(z.number().int().positive()).optional(),
  budget: z.coerce.number<number>().positive().optional(),
  revenue: z.coerce.number<number>().positive().optional(),
  runtime: z.coerce.number<number>().positive().optional(),
  price: z.coerce.number<number>().positive().optional(),
  stock: z.coerce.number<number>().int().min(0).optional(),
  posterPath: z.string().optional(),
  backdropPath: z.string().optional(),
});

export type UpdateMovieInput = z.infer<typeof updateMovieSchema>;

//Delete
export const deleteMovieSchema = z.object({
  id: z.number().int().positive(),
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

// --- Checkout Order Schema ---
export const checkoutOrderSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  zipcode: z.string().min(1, { message: "Zip code is required" }),
  city: z.string().min(1, { message: "City is required" }),
  email: z.string().email({ message: "Valid e-mail is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  items: z.array(
    z.object({
      movieId: z.number(),
      quantity: z.number().min(1),
      price: z.number().min(0),
    })
  ),
  totalAmount: z.number().min(0),
  // userId: z.string().optional(), // Avkommentera när vi har inloggning
});

export type CheckoutOrderInput = z.infer<typeof checkoutOrderSchema>;

// export const createMovieSchema = z.object({
//   tmdbId: z.coerce.number<number>().positive().optional(),
//   title: z.string().min(1, { message: "Titel är obligatoriskt." }),
//   overview: z.string().optional(),
//   tagline: z.string().optional(),
//   releaseDate: z.date().optional(),
//   budget: z.coerce.number<number>().positive().optional(),
//   revenue: z.coerce.number<number>().positive().optional(),
//   runtime: z.coerce.number<number>().positive().optional(),
//   price: z.coerce.number<number>().positive().optional(),
//   stock: z.coerce.number<number>().int().optional(),
//   posterPath: z.string().optional(),
//   backdropPath: z.string().optional(),
// });

// export type CreateMovieInput = z.infer<typeof createMovieSchema>;
// //Update
// export const updateMovieSchema = z.object({
//   id: z.number().int().positive(),
//   title: z.string().min(1, { message: "Titel är obligatoriskt." }).optional(),
//   ove: z.string().optional(),
//   releaseDate: z.string().optional(),
//   genreIds: z.array(z.number().int().positive()).optional(),
//   actorIds: z.array(z.number().int().positive()).optional(),
//   directorIds: z.array(z.number().int().positive()).optional(),
//   price: z.number().positive().optional(),
//   stock: z.number().int().min(0).optional(),
// });

// //Delete
// // För att ta bort filmen krävs bara id och den numret ska vara positiv
// export const deleteMovieSchema = z.object({
//   id: z.number().int().positive(),
// });
