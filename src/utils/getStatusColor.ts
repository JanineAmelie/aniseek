import { Theme } from "@mui/material/styles";
import { MediaStatus } from "@/types/anime";

/**
 * Get status color for anime status chips
 */
export const getStatusColor = (
  status?: MediaStatus | null,
  theme?: Theme
): string => {
  if (!theme) {
    return "#9ca3af";
  } // fallback gray

  if (!status) {
    return theme.palette.cuteColors.grayMedium;
  }

  const colorMap: Record<MediaStatus, string> = {
    [MediaStatus.Finished]: theme.palette.cuteColors.mintGreen,
    [MediaStatus.Releasing]: theme.palette.cuteColors.skyBlue,
    [MediaStatus.NotYetReleased]: theme.palette.cuteColors.peach,
    [MediaStatus.Cancelled]: theme.palette.cuteColors.pinkPrimary,
    [MediaStatus.Hiatus]: theme.palette.cuteColors.purplePrimary,
  };

  return colorMap[status] || theme.palette.cuteColors.grayMedium;
};
