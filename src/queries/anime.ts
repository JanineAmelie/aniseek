import { gql } from "../__generated__/gql";

// Get trending anime
export const GET_TRENDING_ANIME = gql(/* GraphQL */ `
  query GetTrendingAnime($page: Int = 1, $perPage: Int = 20) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          medium
          large
        }
        status
        episodes
        averageScore
        description
        genres
        studios {
          nodes {
            name
          }
        }
      }
    }
  }
`);

// Get anime by ID
export const GET_ANIME_BY_ID = gql(/* GraphQL */ `
  query GetAnimeById($id: Int!) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        medium
        large
        extraLarge
      }
      bannerImage
      status
      episodes
      duration
      averageScore
      popularity
      description
      genres
      format
      source
      season
      seasonYear
      favourites
      tags {
        name
        description
        category
        rank
      }
      studios {
        nodes {
          name
        }
      }
      staff {
        nodes {
          name {
            first
            last
          }
        }
      }
      characters {
        nodes {
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
`);

// Search anime
export const SEARCH_ANIME = gql(/* GraphQL */ `
  query SearchAnime($search: String!, $page: Int = 1, $perPage: Int = 20) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(type: ANIME, search: $search) {
        id
        title {
          romaji
          english
        }
        coverImage {
          medium
        }
        status
        episodes
        averageScore
        description
        genres
      }
    }
  }
`);

// Get all available genres
export const GET_GENRES = gql(/* GraphQL */ `
  query GetGenres {
    GenreCollection
  }
`);
