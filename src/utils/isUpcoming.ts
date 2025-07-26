import { Anime, AnimeStatus } from "@/types/anime";

/**
 * Check if anime is upcoming
 */
export const isUpcoming = (anime: Anime): boolean => {
  return anime.status === AnimeStatus.NOT_YET_RELEASED;
};
