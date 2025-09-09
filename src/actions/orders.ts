"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { updateOrderStatusSchema } from "@/lib/zod-schemas";

export async function getAllOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        movies: {
          include: {
            movie: true,
          },
        },
      },
    });
    return orders;
  } catch (error) {
    return [];
  }
}
// --- Skapa en ny order ---
export async function deleteOrder(formData: FormData) {
  const data = Object.fromEntries(formData);
  const orderId = Number(data.id);

  if (!orderId) {
    return { success: false, errors: { _global: ["Ogiltigt order-ID."] } };
  }

  try {
    await prisma.order.delete({
      where: { id: orderId },
    });
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errors: { _global: ["Kunde inte ta bort ordern."] },
    };
  }
}

// --- Uppdatera en orders status (t.ex. från "pending" till "shipped") ---
export async function updateOrderStatus(formData: FormData) {
  const data = Object.fromEntries(formData);
  const validated = updateOrderStatusSchema.safeParse({
    ...data,
    id: Number(data.id),
  });

  if (!validated.success) {
    return { success: false, errors: validated.error.flatten().fieldErrors };
  }

  try {
    await prisma.order.update({
      where: { id: validated.data.id },
      data: { status: validated.data.status },
    });
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errors: { _global: "Kunde inte uppdatera orderstatus." },
    };
  }
}

// --- Ta bort en order ---
export async function createOrder(formData: FormData) {
  const data = Object.fromEntries(formData);
  const userId = data.userId as string;

  if (!userId) {
    return { success: false, errors: { _global: ["Ogiltigt användar-ID."] } };
  }

  try {
    const order = await prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        movies: {
          create: data.movies.map((movieId: string) => ({
            movie: { connect: { id: movieId } },
          })),
        },
      },
    });
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errors: { _global: ["Kunde inte skapa ordern."] },
    };
  }
}
