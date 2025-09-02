export interface Movie {
  title: string;
  releaseDate?: string;
  popularity?: number;
  runtime?: number; // In minutes
  budget?: number;
  revenue?: number;
  overview?: string;
  tagline?: string;
}

// TODO
export interface Person {
  name: string;
}

// TODO
export interface Genre {
  name: string;
}
