import { useSearchParams } from "next/navigation";
import { useReducer } from "react";
import { MediaFormat, MediaSort, MediaStatus } from "@/types/anime";

// Action constants
export const SEARCH_ACTIONS = {
  SET_SEARCH_QUERY: "SET_SEARCH_QUERY",
  SET_SORT_BY: "SET_SORT_BY",
  SET_STATUS_FILTER: "SET_STATUS_FILTER",
  SET_FORMAT_FILTER: "SET_FORMAT_FILTER",
  SET_YEAR_FILTER: "SET_YEAR_FILTER",
  RESET_FILTERS: "RESET_FILTERS",
} as const;

// Types
export interface SearchState {
  searchQuery: string;
  sortBy: MediaSort;
  statusFilter: MediaStatus | "";
  formatFilter: MediaFormat | "";
  yearFilter: number | "";
}

type SearchAction =
  | { type: typeof SEARCH_ACTIONS.SET_SEARCH_QUERY; payload: string }
  | { type: typeof SEARCH_ACTIONS.SET_SORT_BY; payload: MediaSort }
  | { type: typeof SEARCH_ACTIONS.SET_STATUS_FILTER; payload: MediaStatus | "" }
  | { type: typeof SEARCH_ACTIONS.SET_FORMAT_FILTER; payload: MediaFormat | "" }
  | { type: typeof SEARCH_ACTIONS.SET_YEAR_FILTER; payload: number | "" }
  | { type: typeof SEARCH_ACTIONS.RESET_FILTERS };

// Initial state
const initialState: SearchState = {
  searchQuery: "",
  sortBy: MediaSort.PopularityDesc,
  statusFilter: "",
  formatFilter: "",
  yearFilter: "",
};

// Reducer
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
    case SEARCH_ACTIONS.RESET_FILTERS:
      return { ...initialState, searchQuery: state.searchQuery };
    default:
      return state;
  }
}

export function useSearchState() {
  const searchParams = useSearchParams();

  // Initialize state with URL params
  const [state, dispatch] = useReducer(searchReducer, {
    ...initialState,
    searchQuery: searchParams.get("q") || "",
  });

  const actions = {
    setSearchQuery: (query: string) =>
      dispatch({ type: SEARCH_ACTIONS.SET_SEARCH_QUERY, payload: query }),
    setSortBy: (sort: MediaSort) =>
      dispatch({ type: SEARCH_ACTIONS.SET_SORT_BY, payload: sort }),
    setStatusFilter: (status: MediaStatus | "") =>
      dispatch({ type: SEARCH_ACTIONS.SET_STATUS_FILTER, payload: status }),
    setFormatFilter: (format: MediaFormat | "") =>
      dispatch({ type: SEARCH_ACTIONS.SET_FORMAT_FILTER, payload: format }),
    setYearFilter: (year: number | "") =>
      dispatch({ type: SEARCH_ACTIONS.SET_YEAR_FILTER, payload: year }),
    resetFilters: () => dispatch({ type: SEARCH_ACTIONS.RESET_FILTERS }),
  };

  const hasActiveFilters = Boolean(
    state.statusFilter || state.formatFilter || state.yearFilter
  );

  return { state, actions, hasActiveFilters };
}
