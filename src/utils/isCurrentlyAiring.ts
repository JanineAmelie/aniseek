import { Anime, AnimeStatus } from "@/types/anime";

/**
 * Check if anime is currently airing
 */
export const isCurrentlyAiring = (anime: Anime): boolean => {
  return anime.status === AnimeStatus.RELEASING;
};
