/**
 * Format anime score for display
 */
export const formatScore = (score?: number): string => {
  if (!score) return "N/A";
  return `${score}%`;
};
