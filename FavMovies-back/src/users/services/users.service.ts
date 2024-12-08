import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Not, Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { AddMovieDto } from '../dto/add-movie.dto';
import { SignUserInput } from 'src/auth/dto/sign-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async createUser(createUserDto: SignUserInput): Promise<User> {
    try {
      const newUser = this.userRepository.create(createUserDto);
      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
    } catch (error) {
      throw new NotAcceptableException('Could not create a new user');
    }
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username }); //SELECT * from user
    if (!user) {
      return;
    }
    return user;
  }

  async checkIfFavorite(userId: number, mediaId: number): Promise<Movie> {
    try {
      const movie = await this.movieRepository.findOne({
        where: { user: { id: userId }, mediaId },
      });
      return movie;
    } catch (err) {
      throw new ConflictException('Could not find if its your favorite');
    }
  }
  async getFavoritesOfUser(id: number): Promise<Movie[]> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['movies'],
      });
      const { movies } = user;
      return movies;
    } catch (err) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async addFavorite(userId: number, addMovieDto: AddMovieDto): Promise<Movie> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['movies'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const movie = new Movie();
    Object.assign(movie, addMovieDto);
    user.movies.push(movie);
    try {
      await this.userRepository.save(user);
      return movie;
    } catch (err) {
      throw new ServiceUnavailableException('Error saving a movie');
    }
  }

  async removeFavorite(favoriteId: number): Promise<{ message: string }> {
    const movie = await this.movieRepository.findOne({
      where: { id: favoriteId },
      relations: ['user'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${favoriteId} not found`);
    }
    movie.user = null;
    try {
      await this.movieRepository.remove(movie);
      return { message: 'Movie deleted successfully' };
    } catch (err) {
      throw new ConflictException('Error deleting a movie');
    }
  }
}

// private async preloadMovieByTitle(addMovie: AddMovieDto): Promise<Movie> {
//   const title = addMovie.title;
//   const existingMovie = await this.movieRepository.findOneBy({ title });
//   if (existingMovie) {
//     return existingMovie;
//   }
//   return this.movieRepository.create({ ...addMovie });
// }

// async getOneById(id: number) {
//   const user = await this.userRepository.findOneBy({ id }); //SELECT * from user
//   if (!user) {
//     throw new NotFoundException(`Not found user: ${id}`);
//   }
//   return user;
// }
