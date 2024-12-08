import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UsersService } from 'src/users/services/users.service';
import { TmdbService } from './tmdb.service';
import { firstValueFrom } from 'rxjs';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MediaListParamsDto } from './dto/mediaList-params.dto';
import { MediaTypePipe } from './Pipes/media-type.pipe';
import { MediaIdPipe } from './Pipes/media-id.pipe';
import { PageIsNumber } from './Pipes/pageIsNumber.pipe';
import { IsString } from 'class-validator';

@Controller()
export class TmdbController {
  constructor(
    private userService: UsersService,
    private tmdbService: TmdbService,
    private jwtService: JwtService,
    private configService: ConfigService, // Inject ConfigService
  ) {}

  //////////////////////////////////////////////////////////////////////////////////
  @Get('list/:mediaType/:mediaCategory')
  async getList(
    @Query('page', new PageIsNumber()) page: string,
    @Param() params: MediaListParamsDto,
    @Res() res: Response,
  ) {
    try {
      const { mediaType, mediaCategory } = params;

      const listObservable = this.tmdbService.getMediaList({
        mediaType,
        mediaCategory,
        page,
      });
      const response = await firstValueFrom(listObservable);
      res.json(response.data);
    } catch (err) {
      throw new BadRequestException('Error occurred while fetching media list');
    }
  }

  @Get('genres/:mediaType')
  async getGenres(
    @Param('mediaType', MediaTypePipe) mediaType: string,
    @Res() res: Response,
  ) {
    try {
      const mediaObservable = this.tmdbService.getMediaGenres({
        mediaType,
      });
      const response = await firstValueFrom(mediaObservable);
      res.json(response.data);
    } catch (err) {
      throw new BadRequestException('Error occurred while fetching genres');
    }
  }

  @Get('search/:mediaType')
  async search(
    @Query('page', new PageIsNumber()) page: string,
    @Query('query') query: string,
    @Param('mediaType', MediaTypePipe) mediaType: string,
    @Res() res: Response,
  ) {
    if (typeof query !== 'string') {
      throw new BadRequestException('Query must be a string');
    }

    try {
      const searchObservable = this.tmdbService.getMediaSearch({
        query,
        page,
        mediaType: mediaType,
      });

      const response = await firstValueFrom(searchObservable);

      res.json(response.data);
    } catch (err) {
      throw new BadRequestException(
        'Error occurred while fetching search results',
      );
    }
  }
  @Get('detail/:mediaType/:mediaId')
  async getDetail(
    @Param('mediaId', MediaIdPipe) mediaId: number,
    @Param('mediaType', MediaTypePipe) mediaType: string,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const media = await this.tmdbService.getMediaDetailWithExtras({
        mediaType,
        mediaId,
      });
      const token = req.headers.authorization?.replace('Bearer ', '') || null;

      if (token) {
        const decodedToken = this.jwtService.verify(token, {
          secret: this.configService.get<string>('SECRET'),
        });
        const userId = decodedToken.sub;

        const isFavorite = await this.userService.checkIfFavorite(
          userId,
          mediaId,
        );

        media.isFavorite = isFavorite !== null;
      } else {
        media.isFavorite = false;
      }
      res.json(media);
    } catch (err) {
      throw new BadRequestException(
        'Error occurred while fetching media detail',
      );
    }
  }
}
