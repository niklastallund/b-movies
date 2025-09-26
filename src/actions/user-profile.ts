"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// --- Hämta användarens profil ---
export async function getUserProfile(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

// --- Uppdatera användarens profil ---
export async function updateUserProfile(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  // Validering
  if (!name || name.trim().length < 2) {
    return { 
      success: false, 
      errors: { name: ["Name must be at least 2 characters long"] } 
    };
  }

  if (!email || !email.includes("@")) {
    return { 
      success: false, 
      errors: { email: ["Please enter a valid email address"] } 
    };
  }

  try {
    // Kontrollera om emailen redan används av någon annan användare
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
        NOT: {
          id: session.user.id
        }
      }
    });

    if (existingUser) {
      return { 
        success: false, 
        errors: { email: ["This email is already in use"] } 
      };
    }

    // Uppdatera användaren
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name.trim(),
        email: email.trim(),
        updatedAt: new Date(),
      },
    });

    revalidatePath("/settings");
    return { success: true, message: "Profile updated successfully!" };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { 
      success: false, 
      errors: { _global: ["Failed to update profile. Please try again."] } 
    };
  }
}

// --- Uppdatera lösenord ---
export async function updatePassword(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validering
  if (!currentPassword) {
    return { 
      success: false, 
      errors: { currentPassword: ["Current password is required"] } 
    };
  }

  if (!newPassword || newPassword.length < 6) {
    return { 
      success: false, 
      errors: { newPassword: ["New password must be at least 6 characters long"] } 
    };
  }

  if (newPassword !== confirmPassword) {
    return { 
      success: false, 
      errors: { confirmPassword: ["Passwords do not match"] } 
    };
  }

  try {
    // Här skulle vi normalt verifiera det gamla lösenordet och uppdatera det nya
    // Men since vi använder better-auth, låt oss returnera en placeholder
    return { 
      success: false, 
      errors: { _global: ["Password update is not yet implemented. Please contact support."] } 
    };
  } catch (error) {
    console.error("Error updating password:", error);
    return { 
      success: false, 
      errors: { _global: ["Failed to update password. Please try again."] } 
    };
  }
}