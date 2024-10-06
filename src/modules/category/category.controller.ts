import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './models';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  service: CategoryService;

  constructor(service: CategoryService) {
    this.service = service;
  }

  @ApiOperation({ description: 'Barcha categoriesni olish', summary: "Barcha categoriyalarni olish" })
  @Get()
  async getCategories(): Promise<Category[]> {
    return await this.service.getAllCategories();
  }
  @ApiOperation({ summary: 'Yangi category yaratish' })
  @Post('/add')
  async createCategory(
    @Body() createCategoryPayload: CreateCategoryDto,
  ): Promise<Category> {
    return await this.service.createCategory(createCategoryPayload);
  }

  @ApiOperation({ summary: 'Categoryni update qilish' })
  @Put('/edit/:categoryId')
  async updateCategory(
    @Body() updateCategoryPayload: UpdateCategoryDto,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    await this.service.updateCategory({
      ...updateCategoryPayload,
      id: categoryId,
    });
  }
  @ApiOperation({ summary: 'Categoryni o\'chirish' })
  @Delete('/delete/:categoryId')
  async deleteCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    await this.service.deleteCategory(categoryId);
  }
}
