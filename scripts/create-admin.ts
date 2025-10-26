// scripts/create-admin.ts
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function createAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set");
  }

  // Check if admin already exists
  const existing = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (existing) {
    console.log("Admin user already exists");
    return;
  }

  // Create admin user with better-auth
  await auth.api.signUpEmail({
    body: {
      email: adminEmail,
      password: adminPassword,
      name: "Admin"
    }
  });

  // Set admin role
  await prisma.user.update({
    where: { email: adminEmail },
    data: { role: "admin" }
  });

  console.log("Admin user created successfully");
}

createAdmin().catch(console.error);