// // Amina frontend för att lägga till och ta bort filmer

// src/app/admin/movies/page.tsx

import { Button } from "@/components/ui/button";
import MovieForm from "@/components/admin-movies-form"; // наша форма для фильмов

export default async function AdminMoviesPage() {
  return (
    <div>
      <MovieForm></MovieForm>
    </div>
  );
  //const movies = await getAllMovies(); // забираем все фильмы из базы

  // return (
  //   <div className="container mx-auto p-8 space-y-10">
  //     <h1 className="text-4xl text-sky-600 font-bold">Admin: Filmer</h1>

  //     {/* Форма для создания нового фильма */}
  //     <MovieForm />

  //     {/* Список фильмов */}
  //     <div className="space-y-4">
  //       <h2 className="text-2xl text-sky-600 font-semibold">
  //         Befintliga filmer
  //       </h2>

  //       {movies.length > 0 ? (
  //         <ul className="space-y-3">
  //           {movies.map((movie) => (
  //             <li
  //               key={movie.id}
  //               className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-sm"
  //             >
  //               <div>
  //                 <h3 className="font-medium">{movie.title}</h3>
  //                 <p className="text-sm text-muted-foreground italic">
  //                   {movie.releaseDate
  //                     ? new Date(movie.releaseDate).toLocaleDateString()
  //                     : "Okänt datum"}
  //                 </p>
  //                 <p className="text-sm">
  //                   Pris: {movie.price} kr | Lager: {movie.stock}
  //                 </p>
  //               </div>

  //               <form action={deleteMovie}>
  //                 <input type="hidden" name="id" value={movie.id} />
  //                 <Button
  //                   type="submit"
  //                   className="bg-red-800 text-white-50"
  //                   size="sm"
  //                 >
  //                   Ta bort
  //                 </Button>
  //               </form>
  //             </li>
  //           ))}
  //         </ul>
  //       ) : (
  //         <p className="text-muted-foreground">Inga filmer hittades.</p>
  //       )}
  //     </div>
  //   </div>
  // );
}
