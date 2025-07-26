/**
 * Get anime duration in minutes formatted as string
 */
export const formatDuration = (duration?: number): string => {
  if (!duration) return "Unknown";

  if (duration < 60) {
    return `${duration} min`;
  }

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
};
