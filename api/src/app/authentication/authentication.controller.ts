import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthenticateUserDto } from './dto/authenticate-user.dto';

import { AuthenticationService } from './authentication.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async authenticate(@Body() payload: AuthenticateUserDto): Promise<string> {
    return this.service.authenticate(payload);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() payload: RegisterUserDto): Promise<string> {
    return this.service.register(payload);
  }
}
