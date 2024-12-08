// src/tmdb/tmdb.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TmdbService } from './tmdb.service';
import { TmdbConfig } from './tmdbconfig.service';
import { TmdbEndpoints } from './tmdbendpoints.service';
import { TmdbController } from './tmdb.controller';
import { UsersModule } from 'src/users/users.module';
import { HttpModule } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, HttpModule, ConfigModule],
  providers: [
    TmdbService,
    TmdbConfig,
    TmdbEndpoints,
    JwtService,
    ConfigService,
  ],
  exports: [TmdbService, TmdbConfig, TmdbEndpoints],
  controllers: [TmdbController],
})
export class TmdbModule {}
