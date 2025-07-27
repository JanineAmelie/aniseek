import { useSearchParams } from "next/navigation";
import { useEffect, useReducer, useRef } from "react";
import { MediaFormat, MediaSort, MediaStatus } from "@/types/anime";

export const SEARCH_ACTIONS = {
  SET_SEARCH_QUERY: "SET_SEARCH_QUERY",
  SET_SORT_BY: "SET_SORT_BY",
  SET_STATUS_FILTER: "SET_STATUS_FILTER",
  SET_FORMAT_FILTER: "SET_FORMAT_FILTER",
  SET_YEAR_FILTER: "SET_YEAR_FILTER",
  SET_GENRE_FILTER: "SET_GENRE_FILTER",
  RESET_FILTERS: "RESET_FILTERS",
} as const;

export interface SearchState {
  searchQuery: string;
  sortBy: MediaSort;
  statusFilter: MediaStatus | "";
  formatFilter: MediaFormat | "";
  yearFilter: number | "";
  genreFilter: string;
}

type SearchAction =
  | { type: typeof SEARCH_ACTIONS.SET_SEARCH_QUERY; payload: string }
  | { type: typeof SEARCH_ACTIONS.SET_SORT_BY; payload: MediaSort }
  | { type: typeof SEARCH_ACTIONS.SET_STATUS_FILTER; payload: MediaStatus | "" }
  | { type: typeof SEARCH_ACTIONS.SET_FORMAT_FILTER; payload: MediaFormat | "" }
  | { type: typeof SEARCH_ACTIONS.SET_YEAR_FILTER; payload: number | "" }
  | { type: typeof SEARCH_ACTIONS.SET_GENRE_FILTER; payload: string }
  | { type: typeof SEARCH_ACTIONS.RESET_FILTERS };

const initialState: SearchState = {
  searchQuery: "",
  sortBy: MediaSort.PopularityDesc,
  statusFilter: "",
  formatFilter: "",
  yearFilter: "",
  genreFilter: "",
};

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case SEARCH_ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case SEARCH_ACTIONS.SET_SORT_BY:
      return { ...state, sortBy: action.payload };
    case SEARCH_ACTIONS.SET_STATUS_FILTER:
      return { ...state, statusFilter: action.payload };
    case SEARCH_ACTIONS.SET_FORMAT_FILTER:
      return { ...state, formatFilter: action.payload };
    case SEARCH_ACTIONS.SET_YEAR_FILTER:
      return { ...state, yearFilter: action.payload };
    case SEARCH_ACTIONS.SET_GENRE_FILTER:
      return { ...state, genreFilter: action.payload };
    case SEARCH_ACTIONS.RESET_FILTERS:
      return { ...initialState, searchQuery: state.searchQuery };
    default:
      return state;
  }
}

export function useSearchState() {
  const searchParams = useSearchParams();

  const urlQuery = searchParams?.get("q") || "";
  const urlGenre = searchParams?.get("genre") || "";

  const prevUrlQuery = useRef(urlQuery);
  const prevUrlGenre = useRef(urlGenre);

  const isUpdatingFromUrl = useRef(false);
  const isInitialMount = useRef(true);

  const [state, dispatch] = useReducer(searchReducer, {
    ...initialState,
    searchQuery: urlQuery,
    genreFilter: urlGenre,
  }); // Update state when URL parameters change (only if they actually changed)
  useEffect(() => {
    // Skip initial mount since state is already initialized with URL params
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevUrlQuery.current = urlQuery;
      prevUrlGenre.current = urlGenre;
      return;
    }

    // Only update if URL changed and it's different from previous URL
    if (urlQuery !== prevUrlQuery.current) {
      isUpdatingFromUrl.current = true;
      dispatch({ type: SEARCH_ACTIONS.SET_SEARCH_QUERY, payload: urlQuery });
      prevUrlQuery.current = urlQuery;
    }

    if (urlGenre !== prevUrlGenre.current) {
      isUpdatingFromUrl.current = true;
      dispatch({ type: SEARCH_ACTIONS.SET_GENRE_FILTER, payload: urlGenre });
      prevUrlGenre.current = urlGenre;
    }

    // Reset the flag after updates
    isUpdatingFromUrl.current = false;
  }, [urlQuery, urlGenre]);

  const actions = {
    setSearchQuery: (query: string) => {
      dispatch({ type: SEARCH_ACTIONS.SET_SEARCH_QUERY, payload: query });
    },
    setSortBy: (sort: MediaSort) =>
      dispatch({ type: SEARCH_ACTIONS.SET_SORT_BY, payload: sort }),
    setStatusFilter: (status: MediaStatus | "") =>
      dispatch({ type: SEARCH_ACTIONS.SET_STATUS_FILTER, payload: status }),
    setFormatFilter: (format: MediaFormat | "") =>
      dispatch({ type: SEARCH_ACTIONS.SET_FORMAT_FILTER, payload: format }),
    setYearFilter: (year: number | "") =>
      dispatch({ type: SEARCH_ACTIONS.SET_YEAR_FILTER, payload: year }),
    setGenreFilter: (genre: string) =>
      dispatch({ type: SEARCH_ACTIONS.SET_GENRE_FILTER, payload: genre }),
    resetFilters: () => dispatch({ type: SEARCH_ACTIONS.RESET_FILTERS }),
  };

  const hasActiveFilters = Boolean(
    state.statusFilter ||
      state.formatFilter ||
      state.yearFilter ||
      state.genreFilter
  );

  return { state, actions, hasActiveFilters };
}
