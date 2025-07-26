/**
 * Type definitions for route parameters
 * Ensures type safety when working with dynamic routes
 */

// Route parameter types for each dynamic route
export interface AnimeDetailsParams {
  id: string;
}

export interface GenreDetailsParams {
  id: string;
}

export interface SearchParams {
  q?: string;
  page?: string;
  genre?: string;
  year?: string;
  status?: string;
}

// Union type of all possible route params
export type AppRouteParams =
  | AnimeDetailsParams
  | GenreDetailsParams
  | SearchParams;

// Helper type for page props in Next.js app router
export interface PageProps<T = Record<string, never>> {
  params: T;
  searchParams: Record<string, string | string[] | undefined>;
}

// Specific page prop types
export type AnimeDetailsPageProps = PageProps<AnimeDetailsParams>;
export type GenreDetailsPageProps = PageProps<GenreDetailsParams>;
export type SearchPageProps = PageProps<Record<string, never>>;

// Type guards for route parameters
export const isAnimeDetailsParams = (
  params: unknown
): params is AnimeDetailsParams => {
  return typeof params === "object" && params !== null && "id" in params;
};

export const isGenreDetailsParams = (
  params: unknown
): params is GenreDetailsParams => {
  return typeof params === "object" && params !== null && "id" in params;
};
