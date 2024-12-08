import { IsIn } from 'class-validator';

export class MediaListParamsDto {
  @IsIn(['popular', 'top_rated'])
  mediaCategory: string;

  @IsIn(['movie', 'tv', 'people'])
  mediaType: string;
}
