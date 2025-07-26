import { AnimeStatus } from "@/types/anime";

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
