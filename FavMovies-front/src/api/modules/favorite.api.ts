import { ResponseError } from "../../../../lib/types";
import privateFetch from "../client/private.client";

const favoriteEndpoints = {
  list: "user/favorites",
  add: "user/favorites",
  remove: ({ favoriteId }: { favoriteId: number }) =>
    `user/favorites/${favoriteId}`,
};

export type AddFavorite = {
  mediaId: number;
  title: string;
  poster: string;
  rate: number;
};

export type RemoveApiResponse = {
  message: string;
};

export type FavApiResponse = {
  id: number;
  title: string;
  mediaId: number;
  mediaType: string;
  rate: number;
  poster: string;
};

const favoriteApi = {
  getList: async () => {
    const response = await privateFetch(favoriteEndpoints.list, {
      method: "GET",
    });

    if ("data" in response) {
      return { response: response.data as FavApiResponse[] };
    } else {
      throw { error: { message: "Unknown error" } };
    }
  },
  add: async ({ mediaId, title, poster, rate }: AddFavorite) => {
    const response = await privateFetch(favoriteEndpoints.add, {
      method: "POST",
      body: JSON.stringify({
        mediaId,
        title,
        poster,
        rate,
      }),
    });
    if ("data" in response) {
      return { response: response.data as FavApiResponse };
    } else {
      throw { error: { message: "Unknown error" } };
    }
  },
  remove: async ({ favoriteId }: { favoriteId: number }) => {
    const response = await privateFetch(
      favoriteEndpoints.remove({ favoriteId }),
      { method: "DELETE" }
    );

    if ("data" in response) {
      return { response: response.data as RemoveApiResponse };
    } else {
      throw { error: { message: "Unknown error" } };
    }
  },
};

export default favoriteApi;
