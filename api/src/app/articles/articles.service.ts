import { Repository } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { generateSlug } from '/@/libs/generate-slug';

import { Article } from './entities/article.entity';

import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>,
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService
  ) {}

  async create(input: CreateArticleDto, userId: number): Promise<Article> {
    const { ...rest } = input;
    const user = await this.usersService.findOneById(userId);
    if (!user) throw new BadRequestException('User not found.');

    const slug = generateSlug(input.title);

    let categories = [];
    if (rest.categories) {
      categories = await this.categoriesService.findAllByIds(rest.categories);
    }

    const article = this.repository.create({
      ...rest,
      slug,
      categories,
      author: user
    });

    return await this.repository.save(article);
  }

  async findAll(): Promise<Article[]> {
    return this.repository
      .createQueryBuilder('articles')
      .where('articles.enabled = true')
      .leftJoinAndSelect('articles.author', 'author')
      .leftJoinAndSelect('articles.categories', 'categories')
      .getMany();
  }

  async findAllByUser(userId: number): Promise<Article[]> {
    return this.repository
      .createQueryBuilder('article')
      .where('article.authorId = :userId', { userId })
      .andWhere('article.enabled = true')
      .leftJoinAndSelect('articles.author', 'author')
      .leftJoinAndSelect('articles.categories', 'categories')
      .getMany();
  }

  // findAllByCategory(categoryId: number): Promise<Article[]> {}

  async findOneById(id: number): Promise<Article> {
    return this.repository
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .andWhere('article.enabled = :enabled', { enabled: true })
      .leftJoinAndSelect('articles.author', 'author')
      .leftJoinAndSelect('articles.categories', 'categories')
      .getOne();
  }

  async update(id: number, input: UpdateArticleDto): Promise<Article> {
    const { ...rest } = input;

    const article = await this.findOneById(id);
    if (!article) throw new NotFoundException('Article not found.');

    let slug = article.slug;
    if (rest.title) {
      slug = generateSlug(rest.title);
    }

    let categories = [];
    if (rest.categories) {
      categories = await this.categoriesService.findAllByIds(rest.categories);
    }

    return await this.repository.save({
      ...article,
      ...rest,
      categories,
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
