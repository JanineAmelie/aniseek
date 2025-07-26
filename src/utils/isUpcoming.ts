import { Media, MediaStatus } from "@/types/anime";

/**
 * Check if an anime is upcoming
 */
export const isUpcoming = (anime: Media): boolean => {
  return anime.status === MediaStatus.NotYetReleased;
};
