import { useEffect, useMemo } from "react";
import { useDebounce } from "@/hooks";
import { useAnimeSearch } from "@/hooks/api/useAnimeSearch";
import { SearchState } from "./useSearchState";

export function useSearchAPI(state: SearchState) {
  // Debounced values - grouped for better organization
  const debouncedQuery = useDebounce(state.searchQuery, 500);
  const debouncedFilters = {
    sortBy: useDebounce(state.sortBy, 300),
    status: useDebounce(state.statusFilter, 300),
    format: useDebounce(state.formatFilter, 300),
    year: useDebounce(state.yearFilter, 300),
  };

  // Search API call
  const { data, loading, error, refetch } = useAnimeSearch(
    debouncedQuery,
    1, // currentPage
    20, // perPage
    debouncedFilters.sortBy,
    debouncedFilters.status || undefined,
    debouncedFilters.format || undefined,
    debouncedFilters.year || undefined
  );

  // Check if should perform search
  const shouldSearch = useMemo(() => {
    const hasQuery = debouncedQuery.trim().length > 0;
    const hasFilters = Boolean(
      debouncedFilters.status || debouncedFilters.format || debouncedFilters.year
    );
    return hasQuery || hasFilters;
  }, [debouncedQuery, debouncedFilters.status, debouncedFilters.format, debouncedFilters.year]);

  // Auto-search when debounced values change
  useEffect(() => {
    if (shouldSearch) {
      refetch();
    }
  }, [shouldSearch, refetch]);

  // Processed results
  const searchResults = useMemo(
    () =>
      (data?.Page?.media || []).filter(
        (anime): anime is NonNullable<typeof anime> => anime !== null
      ),
    [data]
  );

  return {
    searchResults,
    totalResults: data?.Page?.pageInfo?.total || 0,
    loading,
    error,
    refetch,
    shouldSearch,
  };
}
