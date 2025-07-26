// Import and re-export GraphQL generated types
import type {
  GetAnimeByIdQuery,
  GetTrendingAnimeQuery,
  Media,
  MediaCoverImage,
  MediaTitle,
  SearchAnimeQuery,
} from "@/__generated__/graphql";
// Import enums as values (not types)
import {
  MediaFormat,
  MediaSeason,
  MediaSort,
  MediaSource,
  MediaStatus,
} from "@/__generated__/graphql";

// Re-export types for easier imports elsewhere
export type {
  Media,
  MediaTitle,
  MediaCoverImage,
  GetTrendingAnimeQuery,
  GetAnimeByIdQuery,
  SearchAnimeQuery,
};

// Re-export enums
export { MediaStatus, MediaFormat, MediaSeason, MediaSource, MediaSort };

// Type alias for the media array from queries
export type AnimeList = NonNullable<
  NonNullable<GetTrendingAnimeQuery["Page"]>["media"]
>;

// Individual anime type from the query results
export type AnimeItem = NonNullable<AnimeList>[number];

// Search result type
export type AnimeSearchResult = SearchAnimeQuery;

// Search and filter interfaces
export type AnimeFilters = {
  search?: string;
  genre?: string[];
  year?: number;
  season?: MediaSeason;
  status?: MediaStatus;
  format?: MediaFormat;
  averageScore_greater?: number;
  averageScore_lesser?: number;
  episodes_greater?: number;
  episodes_lesser?: number;
  sort?: MediaSort[];
};
