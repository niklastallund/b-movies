"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { updateOrderStatusSchema } from "@/lib/zod-schemas";
import { requireAdmin } from "@/lib/auth";

// --- Hämta alla ordrar ---
export async function getAllOrders() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
      },
    });
    return orders;
  } catch (error) {
    return [];
  }
}

// --- Hämta användarens ordrar ---
export async function getUserOrders(userId: string) {
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        OrderItem: {
          include: {
            movie: {
              select: {
                title: true,
                price: true,
                posterPath: true,
              },
            },
          },
        },
      },
    });
    return orders;
  } catch (error) {
    return [];
  }
}

// --- Hämta en order med ID ---
export async function getOrderById(orderId: string) {
  const id = Number(orderId);
  if (isNaN(id)) return null;

  try {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        OrderItem: {
          include: {
            movie: true,
          },
        },
      },
    });
  } catch (error) {
    return null;
  }
}

// --- Skapa en ny order (används av kassan, ej admin) ---
export async function createOrder(formData: FormData) {

   //Authorization
    await requireAdmin();

  const data = Object.fromEntries(formData);
  const userId = data.userId as string;

  if (!userId) {
    return { success: false, errors: { _global: ["Ogiltigt användar-ID."] } };
  }

  try {
    const order = await prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        // Lägg till OrderItem om du vill skapa filmer i ordern direkt
        // OrderItem: { create: ... }
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

// --- Ta bort en order ---
export async function deleteOrder(formData: FormData) {

   //Authorization
    await requireAdmin();

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

// --- Uppdatera en orders status ---
export async function updateOrderStatus(formData: FormData) {

   //Authorization
    await requireAdmin();
    
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
      errors: { _global: ["Kunde inte uppdatera orderstatus."] },
    };
  }
}
