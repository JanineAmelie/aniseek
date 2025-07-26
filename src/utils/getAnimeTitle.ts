import { text } from "@/constants/text";
import { MediaTitle } from "@/types/anime";

/**
 * Get the best available title for an anime
 */
export const getAnimeTitle = (title?: MediaTitle | null): string => {
  if (!title) {
    return text.animeCard.unknownTitle;
  }
  return (
    title.english || title.romaji || title.native || text.animeCard.unknownTitle
  );
};
