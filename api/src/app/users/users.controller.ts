import { Body, Controller, Post } from '@nestjs/common';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dtos/create-user.dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  create(@Body() input: CreateUserDto): Promise<User> {
    return this.service.create(input);
  }
}
