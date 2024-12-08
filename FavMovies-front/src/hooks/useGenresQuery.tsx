import { useQuery } from "@tanstack/react-query";
import genreApi, { GenreApiResponse } from "../api/modules/genre.api";
import { ResponseError } from "../../../lib/types";

const useGenresQuery = (mediaType: string) => {
  return useQuery<{ response: GenreApiResponse }, ResponseError>({
    queryKey: ["movies", "genres"],
    queryFn: () =>
      genreApi.getList({
        mediaType,
      }),
    staleTime: 5000,
  });
};

export default useGenresQuery;
