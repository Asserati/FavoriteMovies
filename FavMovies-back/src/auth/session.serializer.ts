import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(/*private readonly userService: UsersService*/) {
    super();
  }
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, { id: user.id, username: user.username });
  }
  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): any {
    // const user = this.userService.getOneById(payload.id);
    done(null, payload);
  }
}
