import { Transform } from 'class-transformer';
import { IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsPositive()
  page: number;
}
