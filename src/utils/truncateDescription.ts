/**
 * Truncate description text
 */
export const truncateDescription = (
  description?: string,
  maxLength: number = 150
): string => {
  if (!description) return "";

  // Remove HTML tags
  const cleanDescription = description.replace(/<[^>]*>/g, "");

  if (cleanDescription.length <= maxLength) return cleanDescription;

  // Find the last space before the limit to avoid cutting words
  const truncated = cleanDescription.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  return lastSpaceIndex > 0
    ? truncated.substring(0, lastSpaceIndex) + "..."
    : truncated + "...";
};
