export type MakeRequestResponse<T> = {
  data?: T;
};

export type ResponseError = {
  message: string;
  code?: number;
  info?: string;
};
//MediaItem
export type MediaItem = {
  id: number;

  title: string;
  name?: string;

  poster_path?: string;
  backdrop_path?: string;

  vote_average?: number;

  genre_ids?: number[];

  overview?: string;
};

export type MediaItemExtend = MediaItem & {
  mediaId?: number;
  mediaType?: string;

  mediaTitle?: string;
  first_air_date?: string;
  release_date?: string;

  poster?: string;
  mediaPoster?: string;
  profile_path?: string;

  mediaRate?: number;
  rate?: number;
};
//Responses
export type MediaApiResponse = {
  page: number;
  results: MediaItemExtend[];
};

export type DetailApiResponse = MediaItemExtend & {
  genres: Genre[];
  isFavorite: boolean;
  videos: Videos;
  recommend: MediaItemExtend[];
};

export type SearchApiResponse = {
  page: number;
  results: MediaItemExtend[];
};
//Favorites
export type TFavoriteItem = {
  id: number;
  title: string;
  mediaId: number;
  mediaType: string;
  rate: number;
  poster: string;
};
//// User
export type SignApiResponse = {
  username: string;
  id: number;
  access_token?: string;
};

export type InfoApiResponse = {
  payload: {
    sub: number;
    name: string;
  };
};
//Items
export type Genre = {
  id: number;
  name: string;
};

export type Video = {
  key: string;
  id: string;
};

export type Videos = {
  id: number;
  results: Video[];
};
