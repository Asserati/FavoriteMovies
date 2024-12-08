import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { EMediaType } from 'src/types';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  mediaId: number;

  @Column({
    type: 'enum',
    enum: EMediaType,
    default: EMediaType.Movie,
  })
  mediaType: EMediaType;

  @Column({ type: 'float' })
  rate: Number;

  @Column()
  poster: string;

  @ManyToOne((type) => User, (user) => user.movies)
  user: User;
}
