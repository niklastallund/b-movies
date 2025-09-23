// // src/app/admin/page.tsx
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // проверь путь
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AdminPage() {
  // Проверяем сессию
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isLoggedIn = !!session;
  const isAdmin = session?.user.role === "admin"

  if (!isLoggedIn || !isAdmin) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-8 space-y-6">
      <h1 className="text-4xl font-bold text-sky-600">Admin Dashboard</h1>

      {!isLoggedIn && (
        <p className="text-red-500">
          You must be logged in to use these buttons.
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href={isLoggedIn ? "/admin/movies" : "#"}>
          <Button className="w-full" disabled={!isLoggedIn}>
            Create movie
          </Button>
        </Link>

        <Link href={isLoggedIn ? "/admin/orders" : "#"}>
          <Button className="w-full" disabled={!isLoggedIn}>
            Create order
          </Button>
        </Link>

        <Link href={isLoggedIn ? "/admin/genres" : "#"}>
          <Button className="w-full" disabled={!isLoggedIn}>
            Create genre
          </Button>
        </Link>

        <Link href={isLoggedIn ? "/admin/person" : "#"}>
          <Button className="w-full" disabled={!isLoggedIn}>
            Create person
          </Button>
        </Link>
      </div>
    </div>
  );
}
