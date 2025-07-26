import { Theme } from "@mui/material/styles";

/**
 * Calculate anime score color based on rating
 */
export const getScoreColor = (score?: number, theme?: Theme): string => {
  if (!theme || !score) return "#9ca3af"; // fallback gray

  if (score >= 80) return theme.palette.cuteColors.mintGreen; // Mint green for excellent
  if (score >= 70) return theme.palette.cuteColors.peach; // Peach for good
  if (score >= 60) return theme.palette.cuteColors.lavender; // Lavender for average
  if (score >= 50) return theme.palette.cuteColors.pinkLight; // Pink light for below average
  return theme.palette.cuteColors.pinkPrimary; // Pink primary for poor
};
