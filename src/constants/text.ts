// @TODO: intl i18n support if time allows
export const text = {
  appName: "AniSeek",
  hero: {
    title: "AniSeek",
    subtitle: "Discover Your Next Favorite Anime",
    bannerAlt: "Anime Banner",
  },
  search: {
    title: "Find Your Next Adventure",
    placeholder: "Search anime titles, genres, or keywords...",
    button: "Search",
  },
  genres: {
    title: "Explore by Genre",
  },
  trending: {
    title: "Trending Now",
  },
  animeCard: {
    unknownTitle: "Unknown Title",
    scoreNotAvailable: "N/A",
    episodes: {
      single: "1 Episode",
      multiple: "Episodes", // Template for "{count} Episodes"
      unknown: "Unknown",
    },
  },
  animeDetails: {
    backToHome: "Back to Home",
    description: "Description",
    genres: "Genres",
    unknown: "Unknown",
    score: "Score",
    infoGrid: {
      format: "Format",
      source: "Source",
      year: "Year",
      duration: "Duration",
      popularity: "Popularity",
      favourites: "Favourites",
      durationUnit: "min",
    },
  },
  animeStatus: {
    completed: "Completed",
    airing: "Airing",
    upcoming: "Upcoming",
    cancelled: "Cancelled",
    hiatus: "Hiatus",
    unknown: "Unknown",
  },
  notFound: {
    errorCode: "404",
    title: "Anime Not Found",
    message: "The anime you're looking for doesn't exist or has been removed.",
    backButton: "Back to Home",
  },
  common: {
    unknown: "Unknown",
    scoreNotAvailable: "N/A",
    ellipsis: "...",
    findAnimeByGenre: "Find Anime by Genre",
  },
  errors: {
    trendingAnime: {
      title: "Failed to load trending anime",
      message:
        "We couldn't fetch the latest trending anime. Please check your connection and try again.",
    },
  },
} as const;
