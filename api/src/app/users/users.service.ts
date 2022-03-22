import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { hashPlainText } from '/@/libs/hash-plain-text';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  async create(input: CreateUserDto): Promise<User> {
    const isAlreadyRegistered = await this.repository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: input.email })
      .orWhere('user.username = :username', { username: input.username })
      .andWhere('user.enabled = :enabled', { enabled: true })
      .getOne();

    if (isAlreadyRegistered) throw new BadRequestException('Email already used by other user.');

    const user = this.repository.create({
      ...input,
      password: await hashPlainText(input.password)
    });

    return await this.repository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.repository
      .createQueryBuilder('users')
      .where('users.enabled = :enabled', { enabled: true })
      .getMany();
  }

  findAllByIds(ids: number[]): Promise<User[]> {
    return this.repository
      .createQueryBuilder('user')
      .where('user.id IN (:...ids)', { ids })
      .andWhere('user.enabled = :enabled', { enabled: true })
      .getMany();
  }

  async findOneById(id: number): Promise<User> {
    return await this.repository
      .createQueryBuilder('user')
      .where('users.id = :id', { id })
      .andWhere('user.enabled = :enabled', { enabled: true })
      .getOne();
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.repository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .andWhere('user.enabled = :enabled', { enabled: true })
      .getOne();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.repository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .andWhere('user.enabled = :enabled', { enabled: true })
      .getOne();
  }
}
