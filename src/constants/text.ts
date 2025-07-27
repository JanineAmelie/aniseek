// @TODO: intl i18n support if time allows
export const text = {
  appName: "AniSeek",
  hero: {
    title: "AniSeek",
    subtitle: "Discover Your Next Favorite Anime",
    bannerAlt: "Anime Banner",
  },
  search: {
    title: "Search",
    cta: "Find your next adventure",
    placeholder: "Search anime titles, genres, or keywords...",
    button: "Search",
    filters: {
      title: "Filters & Sorting",
      clearAll: "Clear All",
      sortBy: "Sort By",
      status: "Status",
      format: "Format",
      year: "Year",
      sortOptions: {
        popularityDesc: "Most Popular",
        scoreDesc: "Highest Rated",
        titleAsc: "Title A-Z",
        newestFirst: "Newest First",
        trending: "Trending",
      },
      statusOptions: {
        all: "All Status",
        airing: "Currently Airing",
        completed: "Completed",
        upcoming: "Upcoming",
      },
      formatOptions: {
        all: "All Formats",
        tv: "TV Series",
        movie: "Movie",
        ova: "OVA",
        special: "Special",
      },
      yearOptions: {
        all: "All Years",
      },
    },
    results: {
      noQuery: "Enter a search term or apply filters to find anime",
      noResults: "No anime found matching your search",
      searchingText: "Searching...",
      adjustFiltersHint: "Try adjusting your search terms or filters",
      resultsCount: {
        single: "1 result found",
        multiple: "{count} results found",
      },
      filterResults: {
        single: "1 anime found with selected filters",
        multiple: "{count} anime found with selected filters",
      },
    },
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
    backTooltip: "Back",
    loading: "Loading...",
    loadingAnimeDetails: "Loading anime details...",
  },
  errors: {
    general: {
      title: "Oops! Something went wrong",
      message: "We couldn't load the anime data. Please try again.",
      retryButton: "Try Again",
    },
    trendingAnime: {
      title: "Failed to load trending anime",
      message:
        "We couldn't fetch the latest trending anime. Please check your connection and try again.",
    },
    searchResults: {
      title: "Failed to load search results",
      message:
        "We couldn't perform your search. Please check your connection and try again.",
    },
  },
} as const;
