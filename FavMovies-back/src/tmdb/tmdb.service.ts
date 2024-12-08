import { ConflictException, Injectable } from '@nestjs/common';
import { TmdbEndpoints } from './tmdbendpoints.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import {
  DetailApiResponse,
  Genre,
  MediaApiResponse,
  SearchApiResponse,
  Videos,
} from '../../../lib/types';
import {
  MediaTypeIdProps,
  MediaListProps,
  MediaTypeProp,
  MediaSearchProps,
} from 'src/types';

@Injectable()
export class TmdbService {
  constructor(
    private tmdbEndpoints: TmdbEndpoints,
    private httpService: HttpService,
  ) {}
  private fetchData(url: string): Observable<AxiosResponse> {
    return this.httpService.get(url).pipe(
      catchError((error) => {
        console.log(error.response.data);
        throw new ConflictException(
          'Error fetching data, forbbiden or not found',
        );
      }),
    );
  }
  getMediaList({
    mediaType,
    mediaCategory,
    page,
  }: MediaListProps): Observable<AxiosResponse<MediaApiResponse>> {
    const url = this.tmdbEndpoints.mediaList({
      mediaType,
      mediaCategory,
      page,
    });
    return this.fetchData(url);
  }

  getMediaDetail({
    mediaType,
    mediaId,
  }: MediaTypeIdProps): Observable<AxiosResponse<DetailApiResponse>> {
    const url = this.tmdbEndpoints.mediaDetail({ mediaType, mediaId });
    return this.fetchData(url);
  }

  getMediaGenres({
    mediaType,
  }: MediaTypeProp): Observable<AxiosResponse<Genre[]>> {
    const url = this.tmdbEndpoints.mediaGenres({ mediaType });
    return this.fetchData(url);
  }

  getMediaVideos({
    mediaType,
    mediaId,
  }: MediaTypeIdProps): Observable<AxiosResponse<Videos>> {
    const url = this.tmdbEndpoints.mediaVideos({ mediaType, mediaId });
    return this.fetchData(url);
  }

  getMediaRecommend({
    mediaType,
    mediaId,
  }: MediaTypeIdProps): Observable<AxiosResponse<MediaApiResponse>> {
    const url = this.tmdbEndpoints.mediaRecommend({ mediaType, mediaId });
    return this.fetchData(url);
  }

  getMediaSearch({
    mediaType,
    query,
    page,
  }: MediaSearchProps): Observable<AxiosResponse<SearchApiResponse>> {
    const url = this.tmdbEndpoints.mediaSearch({ mediaType, query, page });
    return this.fetchData(url);
  }

  //////

  async getMediaDetailWithExtras({ mediaType, mediaId }: MediaTypeIdProps) {
    const params = { mediaType, mediaId };
    const mediaObservable = this.getMediaDetail(params);
    const mediaResponse = await firstValueFrom(mediaObservable);
    const media = mediaResponse.data;
    const videosObservable = this.getMediaVideos(params);
    const videosResponse = await firstValueFrom(videosObservable);
    media.videos = videosResponse.data;

    const recommendObservable = this.getMediaRecommend(params);
    const recommendResponse = await firstValueFrom(recommendObservable);
    media.recommend = recommendResponse.data.results;
    return media;
  }

  // getMediaImages({ mediaType, mediaId }): Observable<AxiosResponse> {
  //   const url = this.tmdbEndpoints.mediaImages({ mediaType, mediaId });
  //   return this.fetchData(url);
  // }

  // getMediaCredits({ mediaType, mediaId }): Observable<AxiosResponse<Video>> {
  //   const url = this.tmdbEndpoints.mediaCredits({ mediaType, mediaId });
  //   return this.fetchData(url);
  // }
  // getPersonDetail({ personId }): Observable<AxiosResponse> {
  //   const url = this.tmdbEndpoints.personDetail({ personId });
  //   return this.fetchData(url);
  // }

  // getPersonMedias({ personId }): Observable<AxiosResponse> {
  //   const url = this.tmdbEndpoints.personMedias({ personId });
  //   return this.fetchData(url);
  // }
}
