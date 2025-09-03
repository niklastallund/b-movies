export interface Movie {
  title: string;
  releaseDate?: string;
  popularity?: number;
  runtime?: number; // In minutes
  budget?: number;
  revenue?: number;
  overview?: string;
  tagline?: string;

  posterPath?: string;
  backdropPath?: string;

  stock?: number //tmp
  price?: number //tmp
}

// TODO
export interface Person {
  name: string;
}

// TODO
export interface Genre {
  name: string;
}

export type PosterSize =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "original";

export type BackdropSize = "w300" | "w780" | "w1280" | "original";
