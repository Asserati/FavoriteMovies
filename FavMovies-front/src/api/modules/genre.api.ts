import publicFetch from "../client/public.client";
import { Genre, ResponseError } from "../../../../lib/types";

const genreEndpoints = {
  list: ({ mediaType }: { mediaType: string }) => `genres/${mediaType}`,
};

export type GenreApiResponse = {
  genres: Genre[];
};

const genreApi = {
  getList: async ({ mediaType }: { mediaType: string }) => {
    const response = await publicFetch<GenreApiResponse>(
      genreEndpoints.list({ mediaType }),
      {
        method: "GET",
      }
    );

    if ("data" in response) {
      return { response: response.data as GenreApiResponse };
    } else {
      throw { error: { message: "Unknown error" } };
    }
  },
};

export default genreApi;
