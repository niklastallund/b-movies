"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

const SORT_FIELDS = [
  { value: "title", label: "Title" },
  { value: "releaseDate", label: "Release Date" },
  { value: "rating", label: "Rating" },
  { value: "votes", label: "Votes" },
];

export default function SortPicker() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || "title";
  const order = searchParams.get("order") || "asc";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleOrderToggle = () => {
    const params = new URLSearchParams(searchParams);
    params.set("order", order === "asc" ? "desc" : "asc");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 items-center">
      <Select value={sort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_FIELDS.map((field) => (
            <SelectItem key={field.value} value={field.value}>
              {field.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon"
        onClick={handleOrderToggle}
        aria-label="Toggle sort order"
      >
        {order === "asc" ? (
          <ArrowUpIcon className="h-4 w-4" />
        ) : (
          <ArrowDownIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
