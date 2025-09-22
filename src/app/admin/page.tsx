// src/app/admin/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold text-sky-600">Admin panel</h1>
      <p className="text-muted-foreground">
        Select an action to manage your store:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
        <Link href="/admin/movies">
          <Button className="w-full">Create movie</Button>
        </Link>

        <Link href="/admin/orders">
          <Button className="w-full">Create order</Button>
        </Link>

        <Link href="/admin/genres">
          <Button className="w-full">Create genre</Button>
        </Link>

        <Link href="/admin/people">
          <Button className="w-full">Create person</Button>
        </Link>
      </div>
    </div>
  );
}
