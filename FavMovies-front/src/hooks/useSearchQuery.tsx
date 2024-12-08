import { useQuery } from "@tanstack/react-query";
import mediaApi from "../api/modules/media.api";
import { ResponseError, SearchApiResponse } from "../../../lib/types";

const useSearchMedia = (query: string, page: number) => {
  return useQuery<{ response: SearchApiResponse }, ResponseError>({
    queryKey: ["search", query, page],
    queryFn: () => mediaApi.search({ mediaType: "movie", query, page }),
    enabled: !!query,
  });
};

export default useSearchMedia;
