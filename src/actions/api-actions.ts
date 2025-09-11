// These are API actions meant to be used with tmdb.ts, a wrapper for The Movie Database API.

import { prisma } from "@/lib/prisma";
import { FindCrewByMovieId, FindMoviesByDirectors } from "@/lib/tmdb";

export async function addMoviesAndCrewFromTmdb() {
  const movies = await FindMoviesByDirectors();

  // For each movie, create a new movie or update it (if it already exists),
  // then find the crew and cast and add them to the database with the movie
  for (const movie of movies) {
    // Just generate some random stock and price for the movie
    const stock = Math.floor(Math.random() * 100) + 1;
    const prices = [49, 59, 69, 79, 89, 99, 109, 119, 129];
    const price = prices[Math.floor(Math.random() * prices.length)];

    const crew = await FindCrewByMovieId(movie.id);

    const addedMovie = await prisma.movie.upsert({
      where: { tmdbId: movie.id },
      create: {
        tmdbId: BigInt(movie.id),
        title: movie.title,
        overview: movie.overview,
        releaseDate: movie.releaseDate
          ? new Date(movie.releaseDate)
          : undefined,
        runtime: movie.runtime,
        budget: movie.budget ? BigInt(movie.budget) : undefined,
        revenue: movie.revenue ? BigInt(movie.revenue) : undefined,
        tagline: movie.tagline,
        posterPath: movie.posterPath,
        backdropPath: movie.backdropPath,
        stock,
        price,
      },
      update: {
        tmdbId: BigInt(movie.id),
        title: movie.title,
        overview: movie.overview,
        releaseDate: movie.releaseDate
          ? new Date(movie.releaseDate)
          : undefined,
        runtime: movie.runtime,
        budget: movie.budget,
        revenue: movie.revenue,
        tagline: movie.tagline,
        posterPath: movie.posterPath,
        backdropPath: movie.backdropPath,
        stock,
        price,
      },
    });

    console.log("Added Movie:", { addedMovie });

    for (const actor of crew.cast) {
      const addedCastMember = await prisma.person.upsert({
        where: { tmdbId: actor.id },
        create: {
          tmdbId: BigInt(actor.id),
          name: actor.name,
          profilePath: actor.profilePath,
          biography: actor.biography,
          birthday: actor.birthday ? new Date(actor.birthday) : undefined,
          deathday: actor.deathday ? new Date(actor.deathday) : undefined,
        },
        update: {
          name: actor.name,
          profilePath: actor.profilePath,
          biography: actor.biography,
          birthday: actor.birthday ? new Date(actor.birthday) : undefined,
          deathday: actor.deathday ? new Date(actor.deathday) : undefined,
        },
      });

      // Link cast member to movie with their character
      await addMovieCrewEntry({
        movieId: addedMovie.id,
        personId: addedCastMember.id,
        role: "cast",
        job: "Actor",
        character: actor.character,
        order: actor.order,
      });

      console.log("Added to Cast:", { addedCastMember });
    }

    for (const crewMember of crew.crew) {
      const addedCrewMember = await prisma.person.upsert({
        where: { tmdbId: crewMember.id },
        create: {
          tmdbId: BigInt(crewMember.id),
          name: crewMember.name,
          profilePath: crewMember.profilePath,
          biography: crewMember.biography,
          birthday: crewMember.birthday
            ? new Date(crewMember.birthday)
            : undefined,
          deathday: crewMember.deathday
            ? new Date(crewMember.deathday)
            : undefined,
        },
        update: {
          name: crewMember.name,
          profilePath: crewMember.profilePath,
          biography: crewMember.biography,
          birthday: crewMember.birthday
            ? new Date(crewMember.birthday)
            : undefined,
          deathday: crewMember.deathday
            ? new Date(crewMember.deathday)
            : undefined,
        },
      });

      // Link crew member to movie with their job
      await addMovieCrewEntry({
        movieId: addedMovie.id,
        personId: addedCrewMember.id,
        role: "crew",
        job: crewMember.job,
        character: crewMember.character,
        order: crewMember.order,
      });

      console.log("Added to Crew:", { addedCrewMember });
    }
  }
}

async function addMovieCrewEntry({
  movieId,
  personId,
  role,
  job,
  character,
  order,
}: {
  movieId: number;
  personId: number;
  role: string;
  job?: string;
  character?: string;
  order?: number;
}) {
  const existing = await prisma.movieCrew.findUnique({
    where: {
      movieId_personId_role_job_character: {
        movieId,
        personId,
        role,
        job: job ?? "",
        character: character ?? "",
      },
    },
  });

  if (existing) {
    return await prisma.movieCrew.update({
      where: { id: existing.id },
      data: { order },
    });
  } else {
    return await prisma.movieCrew.create({
      data: { movieId, personId, role, job, character, order },
    });
  }
}
