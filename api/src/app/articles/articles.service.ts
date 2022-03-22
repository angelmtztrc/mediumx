import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>
  ) {}

  // create(input: CreateArticleDto, userId: number): Promise<Article> {}
  // findAll(): Promise<Article[]> {}
  // findAllByUser(userId: number): Promise<Article[]> {}
  // findAllByCategory(categoryId: number): Promise<Article[]> {}
  // findOneById: (id: number) => Promise<Article> {}
  // update: (id: number, article: Article) => Promise<Article> {}
  // remove: (id: number) => Promise<Article> {}
}
