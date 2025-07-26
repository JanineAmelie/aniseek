import { gql } from "@apollo/client";

// Base anime fragment with all essential fields
export const ANIME_FRAGMENT = gql`
  fragment AnimeInfo on Media {
    id
    title {
      romaji
      english
      native
    }
    description(asHtml: false)
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
    status
    format
    episodes
    duration
    genres
    source
    averageScore
    meanScore
    popularity
    favourites
    coverImage {
      large
      medium
      color
    }
    bannerImage
    studios(isMain: true) {
      nodes {
        name
      }
    }
    isAdult
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
    siteUrl
  }
`;

// Search for anime with pagination
export const SEARCH_ANIME = gql`
  ${ANIME_FRAGMENT}
  query SearchAnime(
    $page: Int = 1
    $perPage: Int = 20
    $search: String
    $genre: [String]
    $year: Int
    $season: MediaSeason
    $status: MediaStatus
    $format: MediaFormat
    $averageScore_greater: Int
    $averageScore_lesser: Int
    $episodes_greater: Int
    $episodes_lesser: Int
    $sort: [MediaSort] = [POPULARITY_DESC]
    $type: MediaType = ANIME
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(
        search: $search
        genre_in: $genre
        seasonYear: $year
        season: $season
        status: $status
        format: $format
        averageScore_greater: $averageScore_greater
        averageScore_lesser: $averageScore_lesser
        episodes_greater: $episodes_greater
        episodes_lesser: $episodes_lesser
        sort: $sort
        type: $type
        isAdult: false
      ) {
        ...AnimeInfo
      }
    }
  }
`;

// Get trending anime
export const GET_TRENDING_ANIME = gql`
  ${ANIME_FRAGMENT}
  query GetTrendingAnime($page: Int = 1, $perPage: Int = 10) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(sort: [TRENDING_DESC], type: ANIME, isAdult: false) {
        ...AnimeInfo
      }
    }
  }
`;

// Get popular anime by genre
export const GET_POPULAR_BY_GENRE = gql`
  ${ANIME_FRAGMENT}
  query GetPopularByGenre(
    $genre: [String]
    $page: Int = 1
    $perPage: Int = 12
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(
        genre_in: $genre
        sort: [POPULARITY_DESC]
        type: ANIME
        isAdult: false
      ) {
        ...AnimeInfo
      }
    }
  }
`;

// Get top rated anime
export const GET_TOP_RATED_ANIME = gql`
  ${ANIME_FRAGMENT}
  query GetTopRatedAnime($page: Int = 1, $perPage: Int = 12) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(
        sort: [SCORE_DESC]
        type: ANIME
        isAdult: false
        averageScore_greater: 80
      ) {
        ...AnimeInfo
      }
    }
  }
`;

// Get anime by ID (for individual anime pages)
export const GET_ANIME_BY_ID = gql`
  ${ANIME_FRAGMENT}
  query GetAnimeById($id: Int!) {
    Media(id: $id, type: ANIME) {
      ...AnimeInfo
      stats {
        scoreDistribution {
          score
          amount
        }
      }
    }
  }
`;

// Get recommendations based on an anime
export const GET_ANIME_RECOMMENDATIONS = gql`
  ${ANIME_FRAGMENT}
  query GetAnimeRecommendations($id: Int!, $page: Int = 1, $perPage: Int = 12) {
    Media(id: $id, type: ANIME) {
      recommendations(page: $page, perPage: $perPage, sort: [RATING_DESC]) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        nodes {
          rating
          mediaRecommendation {
            ...AnimeInfo
          }
        }
      }
    }
  }
`;

// Get anime similar to provided genres and score
export const GET_SIMILAR_ANIME = gql`
  ${ANIME_FRAGMENT}
  query GetSimilarAnime(
    $genres: [String]
    $excludeIds: [Int]
    $minScore: Int = 70
    $page: Int = 1
    $perPage: Int = 12
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(
        genre_in: $genres
        id_not_in: $excludeIds
        averageScore_greater: $minScore
        sort: [SCORE_DESC, POPULARITY_DESC]
        type: ANIME
        isAdult: false
      ) {
        ...AnimeInfo
      }
    }
  }
`;

// Get all available genres
export const GET_GENRES = gql`
  query GetGenres {
    GenreCollection
  }
`;
