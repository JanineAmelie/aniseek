import { gql } from "@apollo/client";
import { ANIME_DETAILS_FRAGMENT } from "../fragments";

export const GET_ANIME_BY_ID = gql`
  query GetAnimeById($id: Int!) {
    Media(id: $id, type: ANIME) {
      ...AnimeDetailsFragment
    }
  }
  ${ANIME_DETAILS_FRAGMENT}
`;
