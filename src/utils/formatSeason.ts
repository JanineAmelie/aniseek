import { Media } from "@/types/anime";
import { formatYear } from "./formatYear";

/**
 * Format anime season
 */
export const formatSeason = (anime: Media): string => {
  if (anime.season && anime.seasonYear) {
    const season = anime.season.toLowerCase();
    const capitalizedSeason = season.charAt(0).toUpperCase() + season.slice(1);
    return `${capitalizedSeason} ${anime.seasonYear}`;
  }
  return formatYear(anime);
};
