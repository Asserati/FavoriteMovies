import { IsString, MinLength } from 'class-validator';

export class SignUserInput {
  @IsString()
  @MinLength(8)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
