import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class MediaTypePipe implements PipeTransform {
  readonly allowedValues = ['movie', 'tv', 'person'];

  transform(value: string) {
    if (!this.isMediaTypeValid(value)) {
      throw new BadRequestException(
        `Invalid media type: ${value}. Allowed values are: ${this.allowedValues.join(
          ', ',
        )}`,
      );
    }
    return value;
  }

  private isMediaTypeValid(mediaType: any) {
    const idx = this.allowedValues.indexOf(mediaType);
    return idx !== -1;
  }
}
