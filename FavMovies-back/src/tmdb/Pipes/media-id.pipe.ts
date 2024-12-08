import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class MediaIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const mediaId = parseInt(value, 10);
    if (isNaN(mediaId) || mediaId < 1) {
      throw new BadRequestException(`Media ID must be a positive number.`);
    }
    return mediaId;
  }
}
