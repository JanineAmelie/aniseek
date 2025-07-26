import { gql } from '@apollo/client';

export const GET_TRENDING_ANIME = gql`
  query GetTrendingAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          romaji
          english
          native
        }
        description
        episodes
        duration
        status
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
        season
        seasonYear
        averageScore
        popularity
        genres
        studios {
          nodes {
            id
            name
          }
        }
        coverImage {
          large
          medium
          color
        }
        bannerImage
        format
        source
        isAdult
      }
    }
  }
`;

export const GET_ANIME_BY_ID = gql`
  query GetAnimeById($id: Int!) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      description
      episodes
      duration
      status
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
      season
      seasonYear
      averageScore
      popularity
      favourites
      genres
      studios {
        nodes {
          id
          name
        }
      }
      coverImage {
        large
        medium
        color
      }
      bannerImage
      format
      source
      isAdult
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
  }
`;

export const SEARCH_ANIME = gql`
  query SearchAnime($search: String, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, search: $search) {
        id
        title {
          romaji
          english
          native
        }
        description
        episodes
        duration
        status
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
        season
        seasonYear
        averageScore
        popularity
        genres
        studios {
          nodes {
            id
            name
          }
        }
        coverImage {
          large
          medium
          color
        }
        bannerImage
        format
        source
        isAdult
      }
    }
  }
`;

export const GET_GENRES = gql`
  query GetGenres {
    GenreCollection
  }
`;
