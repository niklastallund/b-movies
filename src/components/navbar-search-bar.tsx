"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function NavbarSearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const isOnMoviesPage = pathname === "/movies";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() && !isOnMoviesPage) {
      router.push(`/movies?page=1&q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        disabled={isOnMoviesPage}
        className="w-full"
      />
      <button type="submit" className="hidden" aria-hidden="true" />
    </form>
  );
}
