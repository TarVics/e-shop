import {
  Body,
  Controller,
  Get,
  Delete,
  HttpStatus,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

import { ApiPaginatedResponse } from '../../core/decorators';
import { PageDto } from '../../core/dtos';

import { CurrentUser, Private } from '../../auth/decorators';

import {
  CreateReviewDto,
  OptionsReviewPageDto,
  ParamsUidDto,
  UpdateReviewDto,
  ViewReviewDto,
} from '../dto';
import { ReviewEntity } from '../entities';
import { ReviewsService } from '../services';
import { AuthUser } from '../../auth/entities';

/**
 * Shop / Reviews
 */
@ApiTags('Shop / Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  /**
   * Read all Review items
   * @param optionsReviewPageDto
   */
  @ApiPaginatedResponse(ReviewEntity)
  @Get()
  findAll(
    @Query() optionsReviewPageDto: OptionsReviewPageDto,
  ): Promise<PageDto<ViewReviewDto>> {
    return this.reviewsService.findAll(optionsReviewPageDto);
  }

  /**
   * Read Review item by uid
   * @param params
   */
  @ApiOkResponse({ type: ReviewEntity, description: 'Item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Get(':uid')
  async findOne(@Param() params: ParamsUidDto): Promise<ViewReviewDto> {
    const entity = await this.reviewsService.findOne(params.uid);
    if (!entity) throw new NotFoundException();
    return entity;
  }

  /**
   * Create Review item
   * @param user
   * @param createReviewDto
   * @param optionsReviewPageDto
   */
  @Private()
  @ApiCreatedResponse({ type: ReviewEntity, description: 'Item created' })
  @Post()
  async create(
    @CurrentUser() user: AuthUser,
    @Body() createReviewDto: CreateReviewDto,
    // @Query() optionsReviewPageDto: OptionsReviewPageDto,
  ): Promise<ViewReviewDto> {
    const entity = await this.reviewsService.create(user, createReviewDto);
    if (!entity) throw new NotFoundException('Product is not exists');
    return entity;
  }

  /**
   * Update Review item by uid
   * @param params
   * @param user
   * @param updateReviewDto
   */
  @Private()
  @ApiOkResponse({ type: ReviewEntity, description: 'Result item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @ApiForbiddenResponse({ description: 'Item is forbidden to change' })
  @Patch(':uid')
  async update(
    @Param() params: ParamsUidDto,
    @CurrentUser() user: AuthUser,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<ViewReviewDto> {
    const entity = await this.reviewsService.update(
      params.uid,
      user,
      updateReviewDto,
    );
    if (!entity) throw new NotFoundException();
    return entity;
  }

  /**
   * Remove Review item by uid
   * @param params
   * @param user
   */
  @Private()
  @ApiNoContentResponse({ description: 'Deleted' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':uid')
  async remove(
    @Param() params: ParamsUidDto,
    @CurrentUser() user: AuthUser,
  ): Promise<void> {
    const res: boolean = await this.reviewsService.remove(params.uid, user);
    if (!res) throw new NotFoundException();
  }
}
