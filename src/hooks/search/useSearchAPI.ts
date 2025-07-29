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

  // Get search results from API response, filtering out null values
  const rawResults = data?.Page?.media || [];
  const searchResults = rawResults.filter(anime => anime !== null);

  return {
    searchResults,
    totalResults: data?.Page?.pageInfo?.total || 0,
    loading,
    error,
    refetch,
  };
}
