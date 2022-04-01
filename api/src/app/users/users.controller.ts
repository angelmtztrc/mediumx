import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors
} from '@nestjs/common';

import { User } from './entities/user.entity';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  create(@Body() input: CreateUserDto): Promise<User> {
    return this.service.create(input);
  }
}
