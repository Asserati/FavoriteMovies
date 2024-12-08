// src/tmdb/tmdb.endpoints.ts
import { Injectable } from '@nestjs/common';
import { TmdbConfig } from './tmdbconfig.service';
import {
  MediaTypeIdProps,
  MediaListProps,
  MediaTypeProp,
  MediaSearchProps,
} from 'src/types';

@Injectable()
export class TmdbEndpoints {
  constructor(private readonly tmdbconfig: TmdbConfig) {}
  mediaList({ mediaType, mediaCategory, page }: MediaListProps) {
    return this.tmdbconfig.getUrl(`${mediaType}/${mediaCategory}`, { page });
  }

  mediaDetail({ mediaType, mediaId }: MediaTypeIdProps) {
    return this.tmdbconfig.getUrl(`${mediaType}/${mediaId}`);
  }

  mediaGenres({ mediaType }: MediaTypeProp) {
    return this.tmdbconfig.getUrl(`genre/${mediaType}/list`);
  }

  mediaCredits({ mediaType, mediaId }: MediaTypeIdProps) {
    return this.tmdbconfig.getUrl(`${mediaType}/${mediaId}/credits`);
  }

  mediaVideos({ mediaType, mediaId }: MediaTypeIdProps) {
    return this.tmdbconfig.getUrl(`${mediaType}/${mediaId}/videos`);
  }

  mediaRecommend({ mediaType, mediaId }: MediaTypeIdProps) {
    return this.tmdbconfig.getUrl(`${mediaType}/${mediaId}/recommendations`);
  }

  mediaImages({ mediaType, mediaId }: MediaTypeIdProps) {
    return this.tmdbconfig.getUrl(`${mediaType}/${mediaId}/images`);
  }

  mediaSearch({ mediaType, query, page }: MediaSearchProps) {
    return this.tmdbconfig.getUrl(`search/${mediaType}`, { query, page });
  }

  // personDetail({ personId }) {
  //   return this.tmdbconfig.getUrl(`person/${personId}`);
  // }

  // personMedias({ personId }) {
  //   return this.tmdbconfig.getUrl(`person/${personId}/combined_credits`);
  // }
}
