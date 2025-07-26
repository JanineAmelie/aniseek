import { useGetAnimeByIdQuery } from "../../__generated__/hooks";

export const useAnimeDetails = (id: number) => {
  return useGetAnimeByIdQuery({
    variables: { id },
    skip: !id,
  });
};
