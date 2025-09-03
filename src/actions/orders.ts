"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma"; // Korrekt import
import { updateOrderStatusSchema } from "@/lib/zod-schemas";

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
