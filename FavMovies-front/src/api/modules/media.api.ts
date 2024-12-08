import privateFetch from "../client/private.client";
import publicFetch from "../client/public.client";

import {
  DetailApiResponse,
  MediaApiResponse,
  ResponseError,
  SearchApiResponse,
} from "../../../../lib/types";

type ListProps = {
  mediaType: string;
  mediaCategory: string;
  page: number;
};
type DetailProps = {
  mediaType: string;
  mediaId: string;
};
type SearchProps = {
  mediaType: string;
  query: string;
  page: number;
};

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }: ListProps) =>
    `list/${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, mediaId }: DetailProps) =>
    `detail/${mediaType}/${mediaId}`,
  search: ({ mediaType, query, page }: SearchProps) =>
    `search/${mediaType}?query=${query}&page=${page}`,
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }: ListProps) => {
    const response = await publicFetch<MediaApiResponse>(
      mediaEndpoints.list({ mediaType, mediaCategory, page }),
      {
        method: "GET",
      }
    );

    if ("data" in response) {
      return { response: response.data as MediaApiResponse };
    } else {
      throw { error: { message: "Unknown error" } };
    }
  },
  getDetail: async ({ mediaType, mediaId }: DetailProps) => {
    const response = await privateFetch<DetailApiResponse>(
      mediaEndpoints.detail({ mediaType, mediaId }),
      {
        method: "GET",
      }
    );
    if ("data" in response) {
      return { response: response.data as DetailApiResponse };
    } else {
      throw { error: { message: "Unknown error" } };
    }
  },

  search: async ({ mediaType, query, page }: SearchProps) => {
    const response = await publicFetch<SearchApiResponse>(
      mediaEndpoints.search({ mediaType, query, page }),
      { method: "GET" }
    );

    if ("data" in response) {
      return { response: response.data as SearchApiResponse };
    } else {
      throw { error: { message: "Unknown error" } };
    }
  },
};

export default mediaApi;
