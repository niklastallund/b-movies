import { BackdropSize, PosterSize } from "./types";

/* These functions need a path which should have been provided by the
   TMDB API, and the PosterSize and BackdropSize values are the valid
   sizes that TMDB supports for each image type. They have a default
   value provided which can be used if unsure. */

export function getPosterUrl(
  path: string | undefined,
  size: PosterSize = "w500"
): string | undefined {
  if (!path) return undefined;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getBackdropUrl(
  path: string | undefined,
  size: BackdropSize = "w1280"
): string | undefined {
  if (!path) return undefined;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
