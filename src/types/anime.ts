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

export type AnimeList = Media[];
export type AnimeItem = Media;
export type AnimeSearchResult = SearchAnimeQuery;
