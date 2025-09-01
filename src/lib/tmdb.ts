import { MovieDb, PersonResult } from "moviedb-promise";
const moviedb = new MovieDb("c0d3fc45d2f4922af3c27e30726b5daa");

// Had to expand PersonResult because it is defined
// in the JSON but not in the original interface
interface PersonResultWithDepartment extends PersonResult {
  known_for_department?: string;
}

export default async function FindMoviesByDirectors() {
  const directorNames: string[] = [
    "James Cameron",
    "Steven Spielberg",
    "Sergio Leone",
  ];

  const directorIds: number[] = [];
  const movieIds: number[] = [];

  //Convert the directorName list to IDs for the most popular director of the query
  for (const name of directorNames) {
    const res = await moviedb.searchPerson({ query: name, page: 1 });

    if (res.results && res.results.length > 0) {
      const matches = res.results.filter(
        (person: PersonResultWithDepartment) =>
          person.name === name && person.known_for_department === "Directing"
      );

      const mostPopular = matches.reduce(
        (max, person) =>
          (person.popularity ?? 0) > (max.popularity ?? 0) ? person : max,
        matches[0]
      );

      console.log(mostPopular);

      if (mostPopular) {
        directorIds.push(mostPopular.id as number);
      }
    }
  }

  console.log(directorIds);

  for (const id of directorIds) {
    const allCredits = await moviedb.personMovieCredits(id);
    const directedMovies = allCredits.crew?.filter(
      (credit) => credit.department === "Directing"
    );

    if (directedMovies) {
      for (const movie of directedMovies) {
        if (movie.id) {
          movieIds.push(movie.id);
        }
      }
    }
  }

  for (const id of movieIds) {
    const movie = await moviedb.movieInfo(id);
    console.log(movie);
  }
}
