import {
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUserInput } from '../dto/sign-user.input';
import { SignApiResponse } from '../../../../lib/types';
import { TValidatedUser } from '../../types';
//validation
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username, password): Promise<TValidatedUser> {
    const user = await this.usersService.findOneByUsername(username);

    if (user) {
      const valid = await bcrypt.compare(password, user?.password);
      if (valid) {
        const { id, username } = user;
        return { id, username };
      }
    }
    throw new NotFoundException('Username or password is incorrect!');
  }

  async login(user: TValidatedUser): Promise<SignApiResponse> {
    const payload = { name: user.username, sub: user.id };
    return {
      username: user.username,
      id: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }
  async signup(createUserInput: SignUserInput): Promise<SignApiResponse> {
    const user = await this.usersService.findOneByUsername(
      createUserInput.username,
    );
    if (user) {
      throw new NotAcceptableException('User already exists!');
    }
    try {
      const password = await bcrypt.hash(createUserInput.password, 10);

      const payload = await this.usersService.createUser({
        ...createUserInput,
        password,
      });
      const { username, id } = payload;

      const access_token = this.jwtService.sign({ id, username });
      return { access_token, username, id };
    } catch (error) {
      throw new NotAcceptableException('Could not create a new user');
    }
  }
}
