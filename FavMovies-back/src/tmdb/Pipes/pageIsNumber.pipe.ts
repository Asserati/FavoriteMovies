import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class PageIsNumber implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const page = parseInt(value, 10);
    if (isNaN(page) || page < 1) {
      throw new BadRequestException(`Page must be a positive number.`);
    }
    return value;
  }
}
