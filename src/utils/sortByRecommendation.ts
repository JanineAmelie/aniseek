import { Media } from "@/types/anime";
import { getRecommendationScore } from "./getRecommendationScore";

/**
 * Sort anime by recommendation score
 */
export const sortByRecommendation = (animeList: Media[]): Media[] => {
  return [...animeList].sort((a, b) => {
    const scoreA = getRecommendationScore(a);
    const scoreB = getRecommendationScore(b);
    return scoreB - scoreA;
  });
};
