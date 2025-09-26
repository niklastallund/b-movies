import { requireAdmin } from "@/lib/auth"; // проверь путь
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminPage() {
  await requireAdmin();

  return (
    <div className="container mx-auto p-8 space-y-6">
      <h1 className="text-4xl font-bold text-sky-600">Admin Dashboard</h1>

      {/* {!isLoggedIn && (
        <p className="text-red-500">
          You must be logged in to use these buttons.
        </p>
      )} */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/admin/movies">
          <Button className="w-full">Create movie</Button>
        </Link>

        <Link href="/admin/orders">
          <Button className="w-full">Create order</Button>
        </Link>

        <Link href="/admin/genres">
          <Button className="w-full">Create genre</Button>
        </Link>

        <Link href="/admin/person">
          <Button className="w-full">Create person</Button>
        </Link>
      </div>
    </div>
  );
}
