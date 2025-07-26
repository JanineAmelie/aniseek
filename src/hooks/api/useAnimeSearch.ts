import { MediaFormat, MediaSort, MediaStatus } from "@/types/anime";
import { useSearchAnimeQuery } from "../../__generated__/hooks";

export const useAnimeSearch = (
  search: string,
  page: number = 1,
  perPage: number = 20,
  sort?: MediaSort,
  status?: MediaStatus,
  format?: MediaFormat,
  seasonYear?: number
) => {
  const result = useSearchAnimeQuery({
    variables: {
      search,
      page,
      perPage,
      sort: sort ? [sort] : undefined,
      status,
      format,
      seasonYear,
    },
    skip: !search,
    notifyOnNetworkStatusChange: true,
  });

  const fetchMore = () => {
    if (result.data?.Page?.pageInfo?.hasNextPage) {
      return result.fetchMore({
        variables: {
          search,
          page: (result.data?.Page?.pageInfo?.currentPage || 0) + 1,
          perPage,
          sort: sort ? [sort] : undefined,
          status,
          format,
          seasonYear,
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
