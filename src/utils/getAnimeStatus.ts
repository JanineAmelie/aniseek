import { text } from "@/constants/text";
import { AnimeStatus } from "@/types/anime";

/**
 * Get formatted anime status
 */
export const getAnimeStatus = (status: AnimeStatus): string => {
  const statusMap: Record<AnimeStatus, string> = {
    [AnimeStatus.FINISHED]: text.animeStatus.completed,
    [AnimeStatus.RELEASING]: text.animeStatus.airing,
    [AnimeStatus.NOT_YET_RELEASED]: text.animeStatus.upcoming,
    [AnimeStatus.CANCELLED]: text.animeStatus.cancelled,
    [AnimeStatus.HIATUS]: text.animeStatus.hiatus,
  };

  return statusMap[status] || text.animeStatus.unknown;
};
