import { text } from "@/constants/text";
import { MediaStatus } from "@/types/anime";

/**
 * Get formatted anime status
 */
export const getAnimeStatus = (status?: MediaStatus | null): string => {
  if (!status) {
    return text.animeStatus.unknown || "Unknown";
  }

  const statusMap: Record<MediaStatus, string> = {
    [MediaStatus.Finished]: text.animeStatus.completed,
    [MediaStatus.Releasing]: text.animeStatus.airing,
    [MediaStatus.NotYetReleased]: text.animeStatus.upcoming,
    [MediaStatus.Cancelled]: text.animeStatus.cancelled,
    [MediaStatus.Hiatus]: text.animeStatus.hiatus,
  };

  return statusMap[status] || "Unknown";
};
