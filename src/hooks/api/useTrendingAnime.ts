import { useGetTrendingAnimeQuery } from "../../__generated__/hooks";

export const useTrendingAnime = (page: number = 1, perPage: number = 20) => {
  const result = useGetTrendingAnimeQuery({
    variables: { page, perPage },
    notifyOnNetworkStatusChange: true,
  });

  const fetchMore = () => {
    if (result.data?.Page?.pageInfo?.hasNextPage) {
      return result.fetchMore({
        variables: {
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
