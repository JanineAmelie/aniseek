import { MediaFormat, MediaSort, MediaStatus } from "@/types/anime";
import { useSearchAnimeQuery } from "../../__generated__/hooks";

interface UseAnimeSearchOptions {
  search: string;
  page?: number;
  perPage?: number;
  sort?: MediaSort;
  status?: MediaStatus;
  format?: MediaFormat;
  seasonYear?: number;
  genre?: string;
}

export const useAnimeSearch = ({
  search,
  page = 1,
  perPage = 20,
  sort,
  status,
  format,
  seasonYear,
  genre,
}: UseAnimeSearchOptions) => {
  // Allow query when there's a search term OR when there are active filters OR when there's a sort (for trending)
  const hasActiveFilters = Boolean(status || format || seasonYear || genre);
  const shouldSkip = !search && !hasActiveFilters && !sort;

  const result = useSearchAnimeQuery({
    variables: {
      search: search || undefined, // Don't send empty string
      page,
      perPage,
      sort: sort ? [sort] : undefined,
      status,
      format,
      seasonYear,
      genre_in: genre ? [genre] : undefined,
    },
    skip: shouldSkip,
    notifyOnNetworkStatusChange: true,
  });

  const fetchMore = () => {
    if (result.data?.Page?.pageInfo?.hasNextPage) {
      return result.fetchMore({
        variables: {
          search: search || undefined,
          page: (result.data?.Page?.pageInfo?.currentPage || 0) + 1,
          perPage,
          sort: sort ? [sort] : undefined,
          status,
          format,
          seasonYear,
          genre_in: genre ? [genre] : undefined,
        },
      });
    }
  };

  return {
    ...result,
    fetchMore,
    hasNextPage: result.data?.Page?.pageInfo?.hasNextPage,
    currentPage: result.data?.Page?.pageInfo?.currentPage,
  };
};
