import { Media, MediaStatus } from "@/types/anime";

/**
 * Check if an anime is currently airing
 */
export const isCurrentlyAiring = (anime: Media): boolean => {
  return anime.status === MediaStatus.Releasing;
};
