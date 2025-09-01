import { MovieDb } from "moviedb-promise";
const moviedb = new MovieDb("c0d3fc45d2f4922af3c27e30726b5daa");

export default async function Test() {
  const directorNames: string[] = [
    "James Cameron",
    "Steven Spielberg",
    "Sergio Leone",
  ];
  const ids: number[] = [];

  for (const name of directorNames) {
    const res = await moviedb.searchPerson({ query: name, page: 1 });

    if (res.results && res.results.length > 0) {
      const matches = res.results.filter((person) => person.name === name);

      const mostPopular = matches.reduce(
        (max, person) =>
          (person.popularity ?? 0) > (max.popularity ?? 0) ? person : max,
        matches[0]
      );

      if (mostPopular) {
        ids.push(mostPopular.id as number);
      }
    }
  }

  console.log(ids);
}
