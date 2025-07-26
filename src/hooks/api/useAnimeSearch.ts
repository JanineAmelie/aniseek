import { useSearchAnimeQuery } from "../../__generated__/hooks";

export const useAnimeSearch = (
  search: string,
  page: number = 1,
  perPage: number = 20
) => {
  const result = useSearchAnimeQuery({
    variables: { search, page, perPage },
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
