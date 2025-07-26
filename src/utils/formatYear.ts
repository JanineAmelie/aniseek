import { text } from "@/constants/text";
import { Anime } from "@/types/anime";

/**
 * Format anime year for display
 */
export const formatYear = (anime: Anime): string => {
  if (anime.startDate?.year) {
    if (anime.endDate?.year && anime.endDate.year !== anime.startDate.year) {
      return `${anime.startDate.year} - ${anime.endDate.year}`;
    }
    return anime.startDate.year.toString();
  }
  return text.common.unknown;
};
