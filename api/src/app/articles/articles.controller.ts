import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { Article } from './entities/article.entity';

import { ArticlesService } from './articles.service';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly service: ArticlesService) {}

  @Post()
  create(@Body() input: CreateArticleDto): Promise<Article> {
    return this.service.create(input, input.userId);
  }

  @Get('user/:userId')
  getAllByUserId(@Param('userId') userId: number): Promise<Article[]> {
    return this.service.findAllByUser(userId);
  }

  @Get(':id')
  getOneById(@Param('id') id: number): Promise<Article> {
    return this.service.findOneById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() input: UpdateArticleDto): Promise<Article> {
    return this.service.update(id, input);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<string> {
    return this.service.remove(id);
  }
}
