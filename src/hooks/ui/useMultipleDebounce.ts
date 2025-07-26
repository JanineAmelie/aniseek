import { MediaFormat, MediaSort, MediaStatus } from "@/types/anime";
import { useDebounce } from "./useDebounce";

/**
 * Custom hook to debounce search filters with specific delays
 */
export function useSearchFiltersDebounce(filters: {
  searchQuery: string;
  sortBy: MediaSort;
  statusFilter: MediaStatus | "";
  formatFilter: MediaFormat | "";
  yearFilter: number | "";
}) {
  const debouncedSearchQuery = useDebounce(filters.searchQuery, 500);
  const debouncedSortBy = useDebounce(filters.sortBy, 300);
  const debouncedStatusFilter = useDebounce(filters.statusFilter, 300);
  const debouncedFormatFilter = useDebounce(filters.formatFilter, 300);
  const debouncedYearFilter = useDebounce(filters.yearFilter, 300);

  return {
    debouncedSearchQuery,
    debouncedSortBy,
    debouncedStatusFilter,
    debouncedFormatFilter,
    debouncedYearFilter,
  };
}
