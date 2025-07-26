import { Media } from "@/types/anime";

/**
 * Filter anime results by additional criteria not handled by GraphQL
 */
export const filterAnimeResults = (
  animeList: Media[],
  filters: {
    hasDescription?: boolean;
    hasScore?: boolean;
    minScore?: number;
  }
): Media[] => {
  return animeList.filter(anime => {
    if (filters.hasDescription && !anime.description?.trim()) {
      return false;
    }

    if (filters.hasScore && !anime.averageScore) {
      return false;
    }

    if (
      filters.minScore &&
      (!anime.averageScore || anime.averageScore < filters.minScore)
    ) {
      return false;
    }

    return true;
  });
};

/**
 * Sort anime results by custom criteria
 */
export const sortAnimeResults = (
  animeList: Media[],
  sortBy: "recommendation" | "episodes" | "duration"
): Media[] => {
  const sorted = [...animeList];

  switch (sortBy) {
    case "recommendation":
      return sorted.sort((a, b) => {
        const scoreA = ((a.averageScore || 0) * (a.popularity || 0)) / 100;
        const scoreB = ((b.averageScore || 0) * (b.popularity || 0)) / 100;
        return scoreB - scoreA;
      });

    case "episodes":
      return sorted.sort((a, b) => {
        const episodesA = a.episodes || 0;
        const episodesB = b.episodes || 0;
        return episodesB - episodesA;
      });

    case "duration":
      return sorted.sort((a, b) => {
        const durationA = a.duration || 0;
        const durationB = b.duration || 0;
        return durationB - durationA;
      });

    default:
      return sorted;
  }
};

/**
 * Get search suggestions based on popular terms
 */
export const getSearchSuggestions = (): string[] => {
  return [
    "Naruto",
    "Attack on Titan",
    "One Piece",
    "Demon Slayer",
    "My Hero Academia",
    "Death Note",
    "Spirited Away",
    "Your Name",
    "Dragon Ball",
    "Tokyo Ghoul",
  ];
};

/**
 * Highlight search terms in text
 */
export const highlightSearchTerms = (
  text: string,
  searchTerm: string
): string => {
  if (!searchTerm.trim()) {
    return text;
  }

  const regex = new RegExp(
    `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  return text.replace(regex, "<mark>$1</mark>");
};
