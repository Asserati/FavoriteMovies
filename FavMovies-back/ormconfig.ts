import { Movie } from 'src/users/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';

const config = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'betmonas',
  database: 'moviedb',
  entities: [User, Movie],
  autoLoadEntities: true,
  synchronize: true,
};

export default config;
