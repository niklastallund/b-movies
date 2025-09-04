import { MovieDb, PersonResult } from "moviedb-promise";
import { Movie, Person } from "./types";

const moviedb = new MovieDb("c0d3fc45d2f4922af3c27e30726b5daa");

// The number of movies we filter from each director
const NUMBER_OF_MOVIES = 10;

// Had to expand PersonResult because it is defined
// in the JSON but not in the original interface
interface PersonResultWithDepartment extends PersonResult {
  known_for_department?: string;
}

// Returns a Movie list with all the details that are needed to add
// a bunch of movies to the database
export async function FindMoviesByDirectors(): Promise<Movie[]> {
  const directorNames: string[] = ["Edward D. Wood Jr."];

  const directorIds: number[] = [];
  const movies: Movie[] = [];

  // Convert the directorName list to IDs for the most popular director of the query
  for (const name of directorNames) {
    const res = await moviedb.searchPerson({ query: name, page: 1 });
    console.log(res);

    // We have to filter by Writing as well because of how TMDB sometimes filter crew
    // Example: Edward D. Wood Jr. is known for writing but he also directed all his movies.
    if (res.results && res.results.length > 0) {
      const matches = res.results.filter(
        (person: PersonResultWithDepartment) =>
          person.name === name &&
          (person.known_for_department === "Directing" ||
            person.known_for_department === "Writing")
      );

      // Assumption made that the most popular person of the search will be on the first page
      const mostPopular = matches.reduce(
        (max, person) =>
          (person.popularity ?? 0) > (max.popularity ?? 0) ? person : max,
        matches[0]
      );

      if (mostPopular && mostPopular.id) {
        directorIds.push(mostPopular.id as number);
      }
    }
  }

  for (const id of directorIds) {
    const allCredits = await moviedb.personMovieCredits(id);
    const directedMovies = allCredits.crew?.filter(
      (credit) => credit.department === "Directing"
    );

    // We take the NUMBER_OF_MOVIES most popular movies by the director
    if (directedMovies) {
      const topMovies = directedMovies
        .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
        .slice(0, NUMBER_OF_MOVIES);

      for (const topMovie of topMovies) {
        const movie = await moviedb.movieInfo(topMovie.id as number);
        const images = await moviedb.movieImages(topMovie.id as number);

        console.log(images);

        const posterPath = images.posters?.[0]?.file_path;
        const backdropPath = images.backdrops?.[0]?.file_path;

        // If the movie doesn't have a title for some reason we discard it.
        // Everything else is set as optional in the interface
        if (movie.title && movie.id) {
          movies.push({
            id: movie.id,
            title: movie.title,
            releaseDate: movie.release_date,
            popularity: movie.popularity,
            runtime: movie.runtime,
            budget: movie.budget,
            revenue: movie.revenue,
            overview: movie.overview,
            tagline: movie.tagline,
            posterPath: posterPath,
            backdropPath: backdropPath,
          });
        }
      }
    }
  }

  console.log(movies); //temporary for testing
  return movies;
}

export async function FindCrewByMovieId(
  movieId: string
): Promise<{ crew: Person[]; cast: Person[] }> {
  const credits = await moviedb.movieCredits({ id: movieId });

  const cast: Person[] = [];
  const crew: Person[] = [];

  if (credits.cast) {
    for (const castMember of credits.cast) {
      if (castMember.id && castMember.name) {
        cast.push({
          id: castMember.id,
          name: castMember.name,
          character: castMember.character,
        });
      }
    }

    if (credits.crew) {
      for (const crewMember of credits.crew) {
        if (crewMember.id && crewMember.name) {
          crew.push({
            id: crewMember.id,
            name: crewMember.name,
            job: crewMember.job,
          });
        }
      }
    }
  }

  console.log({ crew, cast }); //temporary for testing

  return { crew, cast };
}
