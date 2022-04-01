import { Response } from 'express';
import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';

import { AuthenticateUserDto } from './dto/authenticate-user.dto';

import { AuthenticationService } from './authentication.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async authenticate(
    @Body() payload: AuthenticateUserDto,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.service.authenticate(payload);

    return res.json({ response: 'success', data });
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() payload: RegisterUserDto, @Res() res: Response): Promise<Response> {
    const data = await this.service.register(payload);

    return res.json({ response: 'success', data });
  }
}
