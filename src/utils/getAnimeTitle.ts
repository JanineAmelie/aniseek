import { text } from "@/constants/text";
import { AnimeTitle } from "@/types/anime";

/**
 * Get the best available title for an anime
 */
export const getAnimeTitle = (title: AnimeTitle): string => {
  return (
    title.english || title.romaji || title.native || text.animeCard.unknownTitle
  );
};
