import { Anime, UserAnimeEntry } from "@/types/anime";

// Keys for localStorage
const STORAGE_KEYS = {
  MY_LIST: "aniquest_my_list",
  COMPARISON_LIST: "aniquest_comparison",
  USER_PREFERENCES: "aniquest_preferences",
  RECENT_SEARCHES: "aniquest_recent_searches",
} as const;

// Type-safe localStorage wrapper
export class Storage {
  /**
   * Get item from localStorage with type safety
   */
  static get<T>(key: string, defaultValue: T): T {
    if (typeof window === "undefined") return defaultValue;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  }

  /**
   * Set item in localStorage
   */
  static set<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
    }
  }

  /**
   * Remove item from localStorage
   */
  static remove(key: string): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }

  /**
   * Clear all localStorage data
   */
  static clear(): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.clear();
    } catch (error) {
      console.warn("Error clearing localStorage:", error);
    }
  }
}

// My List functionality
export const MyListStorage = {
  /**
   * Get user's anime list
   */
  getMyList(): UserAnimeEntry[] {
    return Storage.get(STORAGE_KEYS.MY_LIST, []);
  },

  /**
   * Add anime to user's list
   */
  addToMyList(
    anime: Anime,
    userScore?: number,
    status?: UserAnimeEntry["status"]
  ): void {
    const myList = this.getMyList();
    const existingIndex = myList.findIndex(
      (entry) => entry.animeId === anime.id
    );

    const newEntry: UserAnimeEntry = {
      animeId: anime.id,
      userScore,
      status: status || "PLANNING",
      progress: 0,
      startedAt: new Date(),
      updatedAt: new Date(),
    };

    if (existingIndex >= 0) {
      myList[existingIndex] = { ...myList[existingIndex], ...newEntry };
    } else {
      myList.push(newEntry);
    }

    Storage.set(STORAGE_KEYS.MY_LIST, myList);
  },

  /**
   * Remove anime from user's list
   */
  removeFromMyList(animeId: number): void {
    const myList = this.getMyList();
    const filteredList = myList.filter((entry) => entry.animeId !== animeId);
    Storage.set(STORAGE_KEYS.MY_LIST, filteredList);
  },

  /**
   * Update anime entry in user's list
   */
  updateMyListEntry(animeId: number, updates: Partial<UserAnimeEntry>): void {
    const myList = this.getMyList();
    const entryIndex = myList.findIndex((entry) => entry.animeId === animeId);

    if (entryIndex >= 0) {
      myList[entryIndex] = {
        ...myList[entryIndex],
        ...updates,
        updatedAt: new Date(),
      };
      Storage.set(STORAGE_KEYS.MY_LIST, myList);
    }
  },

  /**
   * Check if anime is in user's list
   */
  isInMyList(animeId: number): boolean {
    const myList = this.getMyList();
    return myList.some((entry) => entry.animeId === animeId);
  },

  /**
   * Get user's rating for an anime
   */
  getUserRating(animeId: number): number | undefined {
    const myList = this.getMyList();
    const entry = myList.find((entry) => entry.animeId === animeId);
    return entry?.userScore;
  },
};

// Comparison functionality
export const ComparisonStorage = {
  /**
   * Get comparison list
   */
  getComparisonList(): number[] {
    return Storage.get(STORAGE_KEYS.COMPARISON_LIST, []);
  },

  /**
   * Add anime to comparison
   */
  addToComparison(animeId: number): boolean {
    const comparisonList = this.getComparisonList();

    // Max 4 items for comparison
    if (comparisonList.length >= 4) {
      return false;
    }

    if (!comparisonList.includes(animeId)) {
      comparisonList.push(animeId);
      Storage.set(STORAGE_KEYS.COMPARISON_LIST, comparisonList);
      return true;
    }

    return false;
  },

  /**
   * Remove anime from comparison
   */
  removeFromComparison(animeId: number): void {
    const comparisonList = this.getComparisonList();
    const filteredList = comparisonList.filter((id) => id !== animeId);
    Storage.set(STORAGE_KEYS.COMPARISON_LIST, filteredList);
  },

  /**
   * Clear comparison list
   */
  clearComparison(): void {
    Storage.set(STORAGE_KEYS.COMPARISON_LIST, []);
  },

  /**
   * Check if anime is in comparison
   */
  isInComparison(animeId: number): boolean {
    const comparisonList = this.getComparisonList();
    return comparisonList.includes(animeId);
  },

  /**
   * Check if can add more to comparison
   */
  canAddToComparison(): boolean {
    const comparisonList = this.getComparisonList();
    return comparisonList.length < 4;
  },
};

// User preferences
export interface UserPreferences {
  favoriteGenres: string[];
  preferredLanguage: "romaji" | "english" | "native";
  minScore: number;
  maxEpisodes?: number;
  hideAdult: boolean;
  theme: "dark" | "light";
}

export const PreferencesStorage = {
  /**
   * Get user preferences
   */
  getPreferences(): UserPreferences {
    return Storage.get(STORAGE_KEYS.USER_PREFERENCES, {
      favoriteGenres: [],
      preferredLanguage: "english",
      minScore: 60,
      hideAdult: true,
      theme: "dark",
    });
  },

  /**
   * Update user preferences
   */
  updatePreferences(updates: Partial<UserPreferences>): void {
    const currentPreferences = this.getPreferences();
    const newPreferences = { ...currentPreferences, ...updates };
    Storage.set(STORAGE_KEYS.USER_PREFERENCES, newPreferences);
  },
};

// Recent searches
export const SearchStorage = {
  /**
   * Get recent searches
   */
  getRecentSearches(): string[] {
    return Storage.get(STORAGE_KEYS.RECENT_SEARCHES, []);
  },

  /**
   * Add search term to recent searches
   */
  addRecentSearch(searchTerm: string): void {
    if (!searchTerm.trim()) return;

    const recentSearches = this.getRecentSearches();
    const filteredSearches = recentSearches.filter(
      (term) => term.toLowerCase() !== searchTerm.toLowerCase()
    );

    // Add to beginning, keep max 10
    const newSearches = [searchTerm, ...filteredSearches].slice(0, 10);
    Storage.set(STORAGE_KEYS.RECENT_SEARCHES, newSearches);
  },

  /**
   * Clear recent searches
   */
  clearRecentSearches(): void {
    Storage.set(STORAGE_KEYS.RECENT_SEARCHES, []);
  },

  /**
   * Remove specific search term
   */
  removeRecentSearch(searchTerm: string): void {
    const recentSearches = this.getRecentSearches();
    const filteredSearches = recentSearches.filter(
      (term) => term.toLowerCase() !== searchTerm.toLowerCase()
    );
    Storage.set(STORAGE_KEYS.RECENT_SEARCHES, filteredSearches);
  },
};
