import { gql } from "@apollo/client";
import { ANIME_CARD_FRAGMENT, PAGE_INFO_FRAGMENT } from "../fragments";

/**
 * Advanced search with all available filters
 */
export const SEARCH_ANIME = gql`
  query SearchAnime(
    $search: String
    $page: Int = 1
    $perPage: Int = 25
    $sort: [MediaSort] = [POPULARITY_DESC]
    $status: MediaStatus
    $format: MediaFormat
    $seasonYear: Int
    $genre_in: [String]
    $tag_in: [String]
    $minimumTagRank: Int = 18
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        ...PageInfoFragment
      }
      media(
        type: ANIME
        search: $search
        sort: $sort
        status: $status
        format: $format
        seasonYear: $seasonYear
        genre_in: $genre_in
        tag_in: $tag_in
        minimumTagRank: $minimumTagRank
      ) {
        ...AnimeCardFragment
      }
    }
  }
  ${PAGE_INFO_FRAGMENT}
  ${ANIME_CARD_FRAGMENT}
`;
