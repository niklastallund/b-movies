import { MovieDb, PersonResult } from "moviedb-promise";
import { MovieApi, PersonApi } from "./types";

const moviedb = new MovieDb("c0d3fc45d2f4922af3c27e30726b5daa");

//Constants to limit the number of results we get from TMDB
const NUMBER_OF_MOVIES = 6;
const NUMBER_OF_CREW = 5;
const NUMBER_OF_CAST = 5;

// Had to expand PersonResult because it is defined
// in the JSON but not in the original interface
interface PersonResultWithDepartment extends PersonResult {
  known_for_department?: string;
}

// Returns a Movie list with all the details that are needed to add
// a bunch of movies to the database, it also contains genres for each movie
// which need to be handed seperatly in the database
export async function FindMoviesByDirectors(): Promise<MovieApi[]> {
  // Hardcoded a list of directors to search for
  const directorNames: string[] = [
    "Roger Corman",
    "Edward D. Wood Jr.",
    "Jack Arnold",
    "William Castle",
    "Mario Bava",
    "Lloyd Kaufman",
  ];

  const directorIds: number[] = [];
  const movies: MovieApi[] = [];

  // Convert the directorName list to IDs for the most popular director of the query
  for (const name of directorNames) {
    const res = await moviedb.searchPerson({ query: name, page: 1 });

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

  // For each director, find all the movies they have directed
  for (const id of directorIds) {
    const allCredits = await moviedb.personMovieCredits(id);
    const directedMovies = allCredits.crew?.filter(
      (credit) =>
        credit.department === "Directing" &&
        credit.job === "Director" &&
        credit.adult === false
    );

    // We take the NUMBER_OF_MOVIES most popular movies by the director,
    // with at least 100 votes to avoid weird edge cases
    if (directedMovies) {
      const topMovies = directedMovies
        .filter((movie) => (movie.vote_count ?? 0) >= 100)
        .sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0))
        .slice(0, NUMBER_OF_MOVIES);

      for (const topMovie of topMovies) {
        const movie = await moviedb.movieInfo(topMovie.id as number);

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
            votes: movie.vote_count,
            rating: movie.vote_average,
            genres: movie.genres,
            posterPath: movie.poster_path,
            backdropPath: movie.backdrop_path,
          });
        }
      }
    }
  }

  return movies;
}

// Returns the crew and cast for a specific movie
// with all the details that are needed to add them to the database.
// There is missing information from the credits endpoint,
// so we have to make additional requests to get the full person info.
// This means that we will only get a limited number of crew and cast members
// to avoid making too many requests to the API.
export async function FindCrewByMovieId(
  movieId: number
): Promise<{ crew: PersonApi[]; cast: PersonApi[] }> {
  const credits = await moviedb.movieCredits({ id: movieId });

  const cast: PersonApi[] = [];
  const crew: PersonApi[] = [];

  // We sort the cast by order and take the first NUMBER_OF_CAST members
  // because order is the field that defines the importance of the cast member
  // in the movie
  const castSlice = credits.cast
    ? credits.cast
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .slice(0, NUMBER_OF_CAST)
    : [];
  for (const castMember of castSlice) {
    if (castMember.id && castMember.name) {
      const personInfo = await moviedb.personInfo(castMember.id);

      // Let's only add them if they have either a birthday or a profilePath
      // to avoid adding too many empty entries
      if (personInfo.birthday || castMember.profile_path) {
        cast.push({
          id: castMember.id,
          name: castMember.name,
          character: castMember.character,
          order: castMember.order,
          biography: personInfo.biography,
          birthday: personInfo.birthday,
          deathday: personInfo.deathday,
          profilePath: castMember.profile_path,
        });
      }
    }
  }

  // We have to sort the crew by popularity because unlike cast they don't have an order field
  // So we take the most popular crew members to add to the database
  const crewSlice = credits.crew
    ? credits.crew
        .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
        .slice(0, NUMBER_OF_CREW)
    : [];
  for (const crewMember of crewSlice) {
    if (crewMember.id && crewMember.name) {
      const personInfo = await moviedb.personInfo(crewMember.id);

      // Let's only add them if they have either a birthday or a profilePath
      // to avoid adding too many empty entries
      if (personInfo.birthday || crewMember.profile_path) {
        crew.push({
          id: crewMember.id,
          name: crewMember.name,
          job: crewMember.job,
          biography: personInfo.biography,
          birthday: personInfo.birthday,
          deathday: personInfo.deathday,
          profilePath: crewMember.profile_path,
        });
      }
    }
  }

  return { crew, cast };
}
