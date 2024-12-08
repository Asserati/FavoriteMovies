import { TmdbModule } from './tmdb/tmdb.module';
import { GatewayModule } from './gateway/gateway.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'betmonas',
      database: 'moviedb',
      // entities: [User],
      entities: ['dist/src/**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: true,
    }),

    GatewayModule,
    UsersModule,
    AuthModule,
    TmdbModule,
  ],
  providers: [],
})
export class AppModule {}
