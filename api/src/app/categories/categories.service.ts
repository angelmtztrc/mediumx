import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private readonly repository: Repository<Category>) {}

  async create(input: CreateCategoryDto): Promise<Category> {
    input.name = input.name.toLowerCase();

    const isExisting = await this.repository
      .createQueryBuilder('category')
      .where('category.name = :name', { name: input.name })
      .getOne();
    if (isExisting) throw new BadRequestException('Category already exists.');

    const category = this.repository.create(input);
    return await this.repository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.repository.createQueryBuilder('category').getMany();
  }

  async findAllByIds(ids: number[]): Promise<Category[]> {
    return await this.repository
      .createQueryBuilder('category')
      .where('category.id IN (:...ids)', { ids: ids })
      .getMany();
  }

  async findOneById(id: number): Promise<Category> {
    return await this.repository
      .createQueryBuilder('category')
      .where('category.id = :id', { id })
      .getOne();
  }

  async update(id: number, input: UpdateCategoryDto) {
    input.name = input.name.toLowerCase();

    const category = await this.findOneById(id);
    if (!category) throw new NotFoundException('Category not found.');

    return await this.repository.save({ ...category, ...input });
  }

  async remove(id: number) {
    const category = await this.findOneById(id);
    if (!category) throw new NotFoundException('Category not found.');

    await this.repository.remove(category);

    return 'Category deleted successfully.';
  }
}
