import { gql } from "@apollo/client";
import { ANIME_CARD_FRAGMENT, PAGE_INFO_FRAGMENT } from "../fragments";

/**
 * Query for getting trending anime
 */
export const GET_TRENDING_ANIME = gql`
  query GetTrendingAnime($page: Int = 1, $perPage: Int = 20) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        ...PageInfoFragment
      }
      media(type: ANIME, sort: TRENDING_DESC) {
        ...AnimeCardFragment
      }
    }
  }
  ${PAGE_INFO_FRAGMENT}
  ${ANIME_CARD_FRAGMENT}
`;
