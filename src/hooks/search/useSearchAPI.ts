import { useMemo } from "react";
import { useAnimeSearch } from "@/hooks/api/useAnimeSearch";
import { SearchState } from "./useSearchState";

export function useSearchAPI({
  searchQuery,
  sortBy,
  statusFilter,
  formatFilter,
  yearFilter,
  genreFilter,
}: SearchState) {
  const { data, loading, error, refetch } = useAnimeSearch({
    search: searchQuery,
    page: 1,
    perPage: 20,
    sort: sortBy,
    status: statusFilter || undefined,
    format: formatFilter || undefined,
    seasonYear: yearFilter || undefined,
    genre: genreFilter || undefined,
  });

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
