import { useEffect, useMemo } from "react";
import { useDebounce } from "@/hooks";
import { useAnimeSearch } from "@/hooks/api/useAnimeSearch";
import { SearchState } from "./useSearchState";

export function useSearchAPI(state: SearchState) {
  // Debounced values with stable references
  const debouncedQuery = useDebounce(state.searchQuery, 500);
  const debouncedSortBy = useDebounce(state.sortBy, 300);
  const debouncedStatus = useDebounce(state.statusFilter, 300);
  const debouncedFormat = useDebounce(state.formatFilter, 300);
  const debouncedYear = useDebounce(state.yearFilter, 300);
  const debouncedGenre = useDebounce(state.genreFilter, 300);

  // Search API call
  const { data, loading, error, refetch } = useAnimeSearch({
    search: debouncedQuery,
    page: 1,
    perPage: 20,
    status: debouncedStatus || undefined,
    format: debouncedFormat || undefined,
    seasonYear: debouncedYear || undefined,
    genre: debouncedGenre || undefined,
  });

  // Auto-search when debounced values change
  useEffect(() => {
    refetch();
  }, [
    refetch,
    debouncedQuery,
    debouncedSortBy,
    debouncedStatus,
    debouncedFormat,
    debouncedYear,
    debouncedGenre,
  ]);

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
  };
}
