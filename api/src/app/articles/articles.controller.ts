import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';

import { JwtAuthGuard } from '/@/guards/jwt-auth.guard';
import { CurrentUser } from '/@/decorators/current-user.decorator';

import { Article } from './entities/article.entity';

import { ArticlesService } from './articles.service';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

import { JwtPayload } from '../authentication/interfaces/jwt-payload.interface';

@Controller('articles')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ArticlesController {
  constructor(private readonly service: ArticlesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@CurrentUser() user: JwtPayload, @Body() input: CreateArticleDto): Promise<Article> {
    return this.service.create(input, user.id);
  }

  @Get('user/:userId')
  @HttpCode(HttpStatus.OK)
  getAllByUserId(@Param('userId') userId: number): Promise<Article[]> {
    return this.service.findAllByUser(userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOneById(@Param('id') id: number): Promise<Article> {
    return this.service.findOneById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() input: UpdateArticleDto): Promise<Article> {
    return this.service.update(id, input);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: number): Promise<string> {
    return this.service.remove(id);
  }
}
