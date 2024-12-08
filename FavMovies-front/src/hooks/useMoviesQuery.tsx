import { useQuery } from "@tanstack/react-query";
import mediaApi from "../api/modules/media.api";
import { MediaApiResponse, ResponseError } from "../../../lib/types";

//only used for page = 1
const useMoviesQuery = (mediaType: string, mediaCategory: string) => {
  return useQuery<{ response: MediaApiResponse }, ResponseError>({
    queryKey: ["movies"],
    queryFn: () =>
      mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      }),
    staleTime: 1000 * 60 * 10, //10 mins
  });
};

export default useMoviesQuery;
