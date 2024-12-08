import { IsNotEmpty } from 'class-validator';

export class AddMovieDto {
  @IsNotEmpty()
  readonly mediaId: number;

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly rate: number;

  @IsNotEmpty()
  readonly poster: string;
}
