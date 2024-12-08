import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { TValidatedUser } from 'src/types';
import { SignUserInput } from '../dto/sign-user.input';
import { validate } from 'class-validator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<TValidatedUser> {
    const userInput = new SignUserInput(username, password);
    const errors = await validate(userInput);
    if (errors.length > 0) {
      throw new BadRequestException(errors[0].constraints);
    }

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
