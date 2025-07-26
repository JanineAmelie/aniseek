import { text } from "@/constants/text";

/**
 * Format anime score for display
 */
export const formatScore = (score?: number): string => {
  if (!score) {
    return text.animeCard.scoreNotAvailable;
  }
  return `${score}%`;
};
