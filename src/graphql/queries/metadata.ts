import { gql } from "@apollo/client";

/**
 * Get all available genres
 */
export const GET_GENRES = gql`
  query GetGenres {
    GenreCollection
  }
`;
