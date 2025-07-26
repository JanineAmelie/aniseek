import { Anime, AnimeStatus } from "@/types/anime";

/**
 * Get anime recommendation score (0-1) based on various factors
 */
export const getRecommendationScore = (
  anime: Anime,
  userPreferences?: {
    favoriteGenres?: string[];
    minScore?: number;
    preferredStatus?: AnimeStatus[];
  }
): number => {
  let score = 0;

  // Base score from average rating (30% weight)
  if (anime.averageScore) {
    score += (anime.averageScore / 100) * 0.3;
  }

  // Popularity factor (20% weight)
  if (anime.popularity) {
    // Normalize popularity (assuming max around 100k)
    const normalizedPopularity = Math.min(anime.popularity / 100000, 1);
    score += normalizedPopularity * 0.2;
  }

  // Genre preference factor (30% weight)
  if (userPreferences?.favoriteGenres && anime.genres) {
    const genreMatches = anime.genres.filter(genre =>
      userPreferences.favoriteGenres!.includes(genre)
    ).length;
    const genreScore =
      genreMatches / Math.max(userPreferences.favoriteGenres.length, 1);
    score += genreScore * 0.3;
  }

  // Status preference factor (10% weight)
  if (userPreferences?.preferredStatus?.includes(anime.status)) {
    score += 0.1;
  }

  // Episode count factor (10% weight) - prefer reasonable episode counts
  if (anime.episodes) {
    if (anime.episodes >= 12 && anime.episodes <= 50) {
      score += 0.1;
    } else if (anime.episodes < 12 || anime.episodes > 50) {
      score += 0.05;
    }
  }

  return Math.min(score, 1); // Cap at 1
};
