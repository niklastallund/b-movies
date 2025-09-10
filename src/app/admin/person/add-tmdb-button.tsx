"use client";

import { addMoviesAndCrewFromTmdb } from "@/actions/api-actions";
import { Button } from "@/components/ui/button";

export default function AddTmdbButton({
  onAdd,
}: {
  onAdd: () => Promise<void>;
}) {
  return (
    <Button
      onClick={async () => {
        await onAdd();
      }}
    >
      Add TMDB to database
    </Button>
  );
}
