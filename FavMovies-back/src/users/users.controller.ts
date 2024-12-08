import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddMovieDto } from './dto/add-movie.dto';
import { Movie } from './entities/movie.entity';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  //////////////////////////////////////////////////////////////////////////
  @UseGuards(JwtAuthGuard)
  @Get('user/favorites')
  getFavoritesOfUser(@Request() req): Promise<Movie[]> {
    return this.usersService.getFavoritesOfUser(req.user.payload.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post('user/favorites')
  addFavoriteToUser(
    @Request() req,
    @Body() addMovieDto: AddMovieDto,
  ): Promise<Movie> {
    return this.usersService.addFavorite(req.user.payload.sub, addMovieDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user/favorites/:favoriteId')
  removeFavorite(
    @Param('favoriteId') favoriteId: number,
  ): Promise<{ message: string }> {
    return this.usersService.removeFavorite(favoriteId);
  }
}
