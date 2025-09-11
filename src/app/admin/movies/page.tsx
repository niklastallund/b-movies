// // Amina frontend för att lägga till och ta bort filmer

// src/app/admin/movies/page.tsx
import MovieForm from "@/components/admin-movies-form"; // наша форма для фильмов

export default async function AdminMoviesPage() {
  return (
    <div>
      <MovieForm></MovieForm>
    </div>
  );
  
}
