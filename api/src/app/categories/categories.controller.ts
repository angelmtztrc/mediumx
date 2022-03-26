import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { Category } from './entities/category.entity';

import { CategoriesService } from './categories.service';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Post()
  create(@Body() input: CreateCategoryDto): Promise<Category> {
    return this.service.create(input);
  }

  @Get()
  getAll(): Promise<Category[]> {
    return this.service.findAll();
  }

  @Get(':id')
  getOneById(@Param('id') id: number): Promise<Category> {
    return this.service.findOneById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() input: UpdateCategoryDto): Promise<Category> {
    return this.service.update(id, input);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<string> {
    return this.service.remove(id);
  }
}
