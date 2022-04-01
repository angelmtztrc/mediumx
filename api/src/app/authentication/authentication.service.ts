import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compareHash } from '/@/libs/compare-hash';

import { UsersService } from '../users/users.service';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async authenticate(input: AuthenticateUserDto): Promise<string> {
    const user = await this.usersService.findOneByEmail(input.email);
    if (!user) throw new BadRequestException('The entered credentials are incorrect.1');

    const canAuthenticate = await compareHash(user.password, input.password);
    if (!canAuthenticate) throw new BadRequestException('The entered credentials are incorrect.2');

    const payload = { id: user.id, email: user.email, username: user.username };
    return await this.jwtService.signAsync(payload);
  }

  async register(input: RegisterUserDto): Promise<string> {
    const user = await this.usersService.create(input);

    const payload = { id: user.id, email: user.email, username: user.username };
    return await this.jwtService.signAsync(payload);
  }
}
