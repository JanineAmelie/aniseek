import { gql } from "@apollo/client";

export const ANIME_CARD_FRAGMENT = gql`
  fragment AnimeCardFragment on Media {
    id
    title {
      romaji
      english
      native
    }
    description
    averageScore
    genres
    coverImage {
      large
      medium
      color
    }
    status
    episodes
    duration
    seasonYear
    format
    source
    isAdult
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
  }
`;

export const ANIME_DETAILS_FRAGMENT = gql`
  fragment AnimeDetailsFragment on Media {
    ...AnimeCardFragment
    popularity
    favourites
    season
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    studios {
      nodes {
        id
        name
      }
    }
    bannerImage
    trailer {
      id
      site
    }
    relations {
      edges {
        relationType
        node {
          id
          title {
            romaji
            english
          }
          coverImage {
            medium
          }
          type
          format
        }
      }
    }
    characters {
      edges {
        role
        node {
          id
          name {
            first
            last
          }
          image {
            medium
          }
        }
      }
    }
    staff {
      edges {
        role
        node {
          id
          name {
            first
            last
          }
          image {
            medium
          }
        }
      }
    }
  }

  ${ANIME_CARD_FRAGMENT}
`;

export const PAGE_INFO_FRAGMENT = gql`
  fragment PageInfoFragment on PageInfo {
    total
    currentPage
    lastPage
    hasNextPage
    perPage
  }
`;
