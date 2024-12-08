import { IsIn, IsString } from 'class-validator';

export class MediaTypeDto {
  @IsIn(['movie', 'tv', 'person'])
  @IsString()
  mediaType: string;
}
