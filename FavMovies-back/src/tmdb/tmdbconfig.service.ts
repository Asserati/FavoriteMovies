// src/tmdb/tmdb.config.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TmdbConfig {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('TMDB_BASE_URL');
    this.apiKey = this.configService.get<string>('TMDB_KEY');
  }

  getUrl(endpoint: string, params?: Record<string, string>) {
    const qs = new URLSearchParams(params);
    return `${this.baseUrl}${endpoint}?api_key=${this.apiKey}&${qs}`;
  }
}
