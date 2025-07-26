import { Theme } from "@mui/material/styles";
import { AnimeStatus } from "@/types/anime";

/**
 * Get status color for anime status chips
 */
export const getStatusColor = (status: AnimeStatus, theme?: Theme): string => {
  if (!theme) return "#9ca3af"; // fallback gray

  const colorMap: Record<AnimeStatus, string> = {
    [AnimeStatus.FINISHED]: theme.palette.cuteColors.mintGreen,
    [AnimeStatus.RELEASING]: theme.palette.cuteColors.skyBlue,
    [AnimeStatus.NOT_YET_RELEASED]: theme.palette.cuteColors.peach,
    [AnimeStatus.CANCELLED]: theme.palette.cuteColors.pinkPrimary,
    [AnimeStatus.HIATUS]: theme.palette.cuteColors.purplePrimary,
  };

  return colorMap[status] || theme.palette.cuteColors.grayMedium;
};
