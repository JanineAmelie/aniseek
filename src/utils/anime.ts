import { Anime, AnimeTitle, AnimeStatus } from "@/types/anime";

/**
 * Get the best available title for an anime
 */
export const getAnimeTitle = (title: AnimeTitle): string => {
  return title.english || title.romaji || title.native || "Unknown Title";
};

/**
 * Format anime score for display
 */
export const formatScore = (score?: number): string => {
  if (!score) return "N/A";
  return `${score}%`;
};

/**
 * Format episode count for display
 */
export const formatEpisodes = (episodes?: number): string => {
  if (!episodes) return "Unknown";
  return episodes === 1 ? "1 Episode" : `${episodes} Episodes`;
};

/**
 * Get formatted anime status
 */
export const getAnimeStatus = (status: AnimeStatus): string => {
  const statusMap: Record<AnimeStatus, string> = {
    [AnimeStatus.FINISHED]: "Completed",
    [AnimeStatus.RELEASING]: "Airing",
    [AnimeStatus.NOT_YET_RELEASED]: "Upcoming",
    [AnimeStatus.CANCELLED]: "Cancelled",
    [AnimeStatus.HIATUS]: "Hiatus",
  };

  return statusMap[status] || "Unknown";
};

/**
 * Truncate description text
 */
export const truncateDescription = (
  description?: string,
  maxLength: number = 150
): string => {
  if (!description) return "";

  // Remove HTML tags
  const cleanDescription = description.replace(/<[^>]*>/g, "");

  if (cleanDescription.length <= maxLength) return cleanDescription;

  // Find the last space before the limit to avoid cutting words
  const truncated = cleanDescription.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  return lastSpaceIndex > 0
    ? truncated.substring(0, lastSpaceIndex) + "..."
    : truncated + "...";
};

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
  return "Unknown";
};

/**
 * Format anime season
 */
export const formatSeason = (anime: Anime): string => {
  if (anime.season && anime.seasonYear) {
    const season = anime.season.toLowerCase();
    const capitalizedSeason = season.charAt(0).toUpperCase() + season.slice(1);
    return `${capitalizedSeason} ${anime.seasonYear}`;
  }
  return formatYear(anime);
};

/**
 * Get anime duration in minutes formatted as string
 */
export const formatDuration = (duration?: number): string => {
  if (!duration) return "Unknown";

  if (duration < 60) {
    return `${duration} min`;
  }

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
};

/**
 * Calculate anime score color based on rating
 */
export const getScoreColor = (score?: number): string => {
  if (!score) return "#666";

  if (score >= 80) return "#4CAF50"; // Green for excellent
  if (score >= 70) return "#8BC34A"; // Light green for good
  if (score >= 60) return "#FFC107"; // Yellow for average
  if (score >= 50) return "#FF9800"; // Orange for below average
  return "#F44336"; // Red for poor
};

/**
 * Get status color for anime status chips
 */
export const getStatusColor = (status: AnimeStatus): string => {
  const colorMap: Record<AnimeStatus, string> = {
    [AnimeStatus.FINISHED]: "#4CAF50",
    [AnimeStatus.RELEASING]: "#2196F3",
    [AnimeStatus.NOT_YET_RELEASED]: "#FF9800",
    [AnimeStatus.CANCELLED]: "#F44336",
    [AnimeStatus.HIATUS]: "#9C27B0",
  };

  return colorMap[status] || "#666";
};

/**
 * Check if anime is currently airing
 */
export const isCurrentlyAiring = (anime: Anime): boolean => {
  return anime.status === AnimeStatus.RELEASING;
};

/**
 * Check if anime is upcoming
 */
export const isUpcoming = (anime: Anime): boolean => {
  return anime.status === AnimeStatus.NOT_YET_RELEASED;
};

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
    const genreMatches = anime.genres.filter((genre) =>
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
