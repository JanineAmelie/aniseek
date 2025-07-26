/**
 * Format episode count for display
 */
export const formatEpisodes = (episodes?: number): string => {
  if (!episodes) return "Unknown";
  return episodes === 1 ? "1 Episode" : `${episodes} Episodes`;
};
