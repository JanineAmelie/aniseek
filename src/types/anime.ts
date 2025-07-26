export interface AnimeTitle {
  romaji?: string;
  english?: string;
  native?: string;
}

export interface CoverImage {
  large?: string;
  medium?: string;
  color?: string;
}

export interface AnimeStudio {
  name: string;
}

export interface AnimeStats {
  scoreDistribution?: Array<{
    score: number;
    amount: number;
  }>;
}

export enum AnimeStatus {
  FINISHED = "FINISHED",
  RELEASING = "RELEASING",
  NOT_YET_RELEASED = "NOT_YET_RELEASED",
  CANCELLED = "CANCELLED",
  HIATUS = "HIATUS",
}

export enum AnimeFormat {
  TV = "TV",
  TV_SHORT = "TV_SHORT",
  MOVIE = "MOVIE",
  SPECIAL = "SPECIAL",
  OVA = "OVA",
  ONA = "ONA",
  MUSIC = "MUSIC",
  MANGA = "MANGA",
  NOVEL = "NOVEL",
  ONE_SHOT = "ONE_SHOT",
}

export enum AnimeSeason {
  WINTER = "WINTER",
  SPRING = "SPRING",
  SUMMER = "SUMMER",
  FALL = "FALL",
}

export enum AnimeSource {
  ORIGINAL = "ORIGINAL",
  MANGA = "MANGA",
  LIGHT_NOVEL = "LIGHT_NOVEL",
  VISUAL_NOVEL = "VISUAL_NOVEL",
  VIDEO_GAME = "VIDEO_GAME",
  OTHER = "OTHER",
  NOVEL = "NOVEL",
  DOUJINSHI = "DOUJINSHI",
  ANIME = "ANIME",
  WEB_NOVEL = "WEB_NOVEL",
  LIVE_ACTION = "LIVE_ACTION",
  GAME = "GAME",
  COMIC = "COMIC",
  MULTIMEDIA_PROJECT = "MULTIMEDIA_PROJECT",
  PICTURE_BOOK = "PICTURE_BOOK",
}

export interface Anime {
  id: number;
  title: AnimeTitle;
  description?: string;
  startDate?: {
    year?: number;
    month?: number;
    day?: number;
  };
  endDate?: {
    year?: number;
    month?: number;
    day?: number;
  };
  season?: AnimeSeason;
  seasonYear?: number;
  status: AnimeStatus;
  format?: AnimeFormat;
  episodes?: number;
  duration?: number;
  chapters?: number;
  volumes?: number;
  genres?: string[];
  source?: AnimeSource;
  averageScore?: number;
  meanScore?: number;
  popularity?: number;
  favourites?: number;
  hashtag?: string;
  coverImage?: CoverImage;
  bannerImage?: string;
  studios?: {
    nodes: AnimeStudio[];
  };
  isAdult?: boolean;
  nextAiringEpisode?: {
    airingAt: number;
    timeUntilAiring: number;
    episode: number;
  };
  stats?: AnimeStats;
  siteUrl?: string;
}

export interface AnimeSearchResult {
  Page: {
    pageInfo: {
      total: number;
      currentPage: number;
      lastPage: number;
      hasNextPage: boolean;
      perPage: number;
    };
    media: Anime[];
  };
}

// Search and filter interfaces
export interface AnimeFilters {
  search?: string;
  genre?: string[];
  year?: number;
  season?: AnimeSeason;
  status?: AnimeStatus;
  format?: AnimeFormat;
  averageScore_greater?: number;
  averageScore_lesser?: number;
  episodes_greater?: number;
  episodes_lesser?: number;
  sort?: AnimeSort[];
}

export enum AnimeSort {
  ID = "ID",
  ID_DESC = "ID_DESC",
  TITLE_ROMAJI = "TITLE_ROMAJI",
  TITLE_ROMAJI_DESC = "TITLE_ROMAJI_DESC",
  TITLE_ENGLISH = "TITLE_ENGLISH",
  TITLE_ENGLISH_DESC = "TITLE_ENGLISH_DESC",
  TITLE_NATIVE = "TITLE_NATIVE",
  TITLE_NATIVE_DESC = "TITLE_NATIVE_DESC",
  TYPE = "TYPE",
  TYPE_DESC = "TYPE_DESC",
  FORMAT = "FORMAT",
  FORMAT_DESC = "FORMAT_DESC",
  START_DATE = "START_DATE",
  START_DATE_DESC = "START_DATE_DESC",
  END_DATE = "END_DATE",
  END_DATE_DESC = "END_DATE_DESC",
  SCORE = "SCORE",
  SCORE_DESC = "SCORE_DESC",
  POPULARITY = "POPULARITY",
  POPULARITY_DESC = "POPULARITY_DESC",
  TRENDING = "TRENDING",
  TRENDING_DESC = "TRENDING_DESC",
  EPISODES = "EPISODES",
  EPISODES_DESC = "EPISODES_DESC",
  DURATION = "DURATION",
  DURATION_DESC = "DURATION_DESC",
  STATUS = "STATUS",
  STATUS_DESC = "STATUS_DESC",
  CHAPTERS = "CHAPTERS",
  CHAPTERS_DESC = "CHAPTERS_DESC",
  VOLUMES = "VOLUMES",
  VOLUMES_DESC = "VOLUMES_DESC",
  UPDATED_AT = "UPDATED_AT",
  UPDATED_AT_DESC = "UPDATED_AT_DESC",
  SEARCH_MATCH = "SEARCH_MATCH",
  FAVOURITES = "FAVOURITES",
  FAVOURITES_DESC = "FAVOURITES_DESC",
}

// User lists and preferences
export interface UserAnimeEntry {
  animeId: number;
  userScore?: number;
  status?: "WATCHING" | "COMPLETED" | "PLANNING" | "DROPPED" | "PAUSED";
  progress?: number;
  notes?: string;
  startedAt?: Date;
  completedAt?: Date;
  updatedAt?: Date;
}
