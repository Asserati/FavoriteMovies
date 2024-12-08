import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SignUserInput } from './dto/sign-user.input';
import { InfoApiResponse, SignApiResponse } from '../../../lib/types';
import { TValidatedUser } from 'src/types';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('user/signin')
  login(@Request() req): Promise<SignApiResponse> {
    const user: TValidatedUser = req.user;
    return this.authService.login(user);
  }
  @Post('user/signup')
  register(@Body() body: SignUserInput): Promise<SignApiResponse> {
    return this.authService.signup(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/info')
  getUser(@Request() req): InfoApiResponse {
    return req.user;
  }
}
