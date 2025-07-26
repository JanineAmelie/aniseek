import { text } from "@/constants/text";

/**
 * Format episode count for display
 */
export const formatEpisodes = (episodes?: number): string => {
  if (!episodes) {
    return text.animeCard.episodes.unknown;
  }
  return episodes === 1
    ? text.animeCard.episodes.single
    : `${episodes} ${text.animeCard.episodes.multiple}`;
};
