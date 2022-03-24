import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Article } from './entities/article.entity';

import { UsersService } from '../users/users.service';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { generateSlug } from '/@/libs/generate-slug';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>,
    private readonly usersService: UsersService
  ) {}

  async create(input: CreateArticleDto, userId: number): Promise<Article> {
    const { categories, ...rest } = input;
    const user = await this.usersService.findOneById(userId);
    if (!user) throw new BadRequestException('User not found.');

    const slug = generateSlug(input.title);

    const article = this.repository.create({
      ...rest,
      slug,
      author: user
    });

    return await this.repository.save(article);
  }

  async findAll(): Promise<Article[]> {
    return this.repository
      .createQueryBuilder('articles')
      .where('articles.enabled = true')
      .getMany();
  }

  async findAllByUser(userId: number): Promise<Article[]> {
    return this.repository
      .createQueryBuilder('article')
      .where('article.authorId = :userId', { userId })
      .andWhere('article.enabled = true')
      .getMany();
  }

  // findAllByCategory(categoryId: number): Promise<Article[]> {}

  async findOneById(id: number): Promise<Article> {
    return this.repository
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .andWhere('article.enabled = :enabled', { enabled: true })
      .getOne();
  }

  async update(id: number, input: UpdateArticleDto): Promise<Article> {
    const { categories, ...rest } = input;

    const article = await this.findOneById(id);
    if (!article) throw new NotFoundException('Article not found.');

    let slug = article.slug;
    if (rest.title) {
      slug = generateSlug(rest.title);
    }

    return await this.repository.save({
      ...article,
      ...rest,
      slug
    });
  }

  async remove(id: number): Promise<string> {
    const article = await this.findOneById(id);
    if (!article) throw new NotFoundException('Article not found.');

    await this.repository.save({
      ...article,
      enabled: false,
      deletedAt: new Date()
    });

    return 'Article deleted successfully.';
  }
}
