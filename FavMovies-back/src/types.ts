export type TValidatedUser = {
  id: number;
  username: string;
};

export enum EMediaType {
  Movie = 'movie',
  TVShow = 'tv',
}

export enum EMediaCategory {
  Popular = 'popular',
  TopRated = 'top_rated',
}

export type MediaListProps = {
  mediaType: string;
  mediaCategory: string;
  page: string;
};

export type MediaTypeIdProps = {
  mediaType: string;
  mediaId: number;
};

export type MediaTypeProp = {
  mediaType: string;
};

export type MediaSearchProps = {
  mediaType: string;
  query: string;
  page: string;
};
