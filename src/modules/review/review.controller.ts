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
import { ReviewService } from './review.service';
import { Review } from './models';
import { CreateReviewDto, UpdateReviewDto } from './dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  service: ReviewService;

  constructor(service: ReviewService) {
    this.service = service;
  }

  @ApiOperation({ description: 'Barcha reviewlarni olish', summary: "Barcha reviewlarni olish" })
  @Get()
  async getReviews(): Promise<Review[]> {
    return await this.service.getAllReviews();
  }
  @ApiOperation({ summary: 'Yangi review yaratish' })
  @Post('/add')
  async createReview(
    @Body() createReviewPayload: CreateReviewDto,
  ): Promise<Review> {
    return await this.service.createReview(createReviewPayload);
  }
  @ApiOperation({ summary: 'Reviewlarni yangilash' })
  @Put('/edit/:reviewid')
  async updateReview(
    @Body() updateReviewPayload: UpdateReviewDto,
    @Param('reviewid', ParseIntPipe) reviewid: number,
  ): Promise<void> {
    await this.service.updateReview({
      ...updateReviewPayload,
      id: reviewid,
    });
  }

  @ApiOperation({ summary: 'Reviewni o\'chirish' })
  @Delete('/delete/:reviewId')
  async deleteReview(
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<void> {
    await this.service.deleteReview(reviewId);
  }
}
