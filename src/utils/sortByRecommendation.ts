import { Anime } from "@/types/anime";
import { getRecommendationScore } from "./getRecommendationScore";

/**
 * Sort anime by recommendation score
 */
export const sortByRecommendation = (
  animeList: Anime[],
  userPreferences?: Parameters<typeof getRecommendationScore>[1]
): Anime[] => {
  return [...animeList].sort((a, b) => {
    const scoreA = getRecommendationScore(a, userPreferences);
    const scoreB = getRecommendationScore(b, userPreferences);
    return scoreB - scoreA;
  });
};
