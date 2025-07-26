/**
 * Application routes constants
 * Centralized route definitions to avoid hardcoded paths throughout the app
 */

export const ROUTES = {
  HOME: "/",
  ANIME: "/anime",
  ANIME_DETAILS: (id: string | number) => `/anime/${id}`,
  SEARCH: "/search",
  SEARCH_RESULTS: (query: string) => `/search?q=${encodeURIComponent(query)}`,
} as const;

// Type-safe route parameters
export type RouteParams = {
  animeId: string | number;
  genreId: string | number;
  searchQuery: string;
};

// Helper function for dynamic routes with validation
export const buildRoute = {
  animeDetails: (id: string | number): string => {
    if (!id) {
      throw new Error("Anime ID is required");
    }
    return ROUTES.ANIME_DETAILS(id);
  },

  searchResults: (query: string): string => {
    if (!query.trim()) {
      throw new Error("Search query is required");
    }
    return ROUTES.SEARCH_RESULTS(query);
  },
} as const;
