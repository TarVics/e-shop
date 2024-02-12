import { unlink } from 'node:fs';
import { join } from 'node:path';
import type { Response, Request } from 'express';

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
  Req,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileNamePart, getMulterImageOptions } from '../../core/utils';
import { ApiFileResponse } from '../../core/decorators';

import { Private } from '../../auth/decorators';
import { AuthRole } from '../../auth/enums';

import {
  CreateCategoryDto,
  UpdateCategoryBannerDto,
  UpdateCategoryDto,
  UpdateCategoryImageDto,
} from '../dto';

import { CategoryEntity } from '../entities';
import { CategoriesService } from '../services';

/**
 * References / Categories
 */
@ApiTags('References / Categories')
@Controller('refs/categories')
export class CategoriesController {
  constructor(private readonly refsService: CategoriesService) {}

  /**
   * Read all Category items
   */
  @Private(AuthRole.Admin)
  @ApiOkResponse({
    type: CategoryEntity,
    isArray: true,
    description: 'Item list',
  })
  @Get()
  findAll(): Promise<CategoryEntity[]> {
    return this.refsService.findAll();
  }

  /**
   * Create Category item
   * @param createCategoryDto
   */
  @Private(AuthRole.Admin)
  @ApiCreatedResponse({ type: CategoryEntity, description: 'Item created' })
  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.refsService.create(createCategoryDto);
  }

  /**
   * Read Category item by id
   * @param id
   */
  @Private(AuthRole.Admin)
  @ApiOkResponse({ type: CategoryEntity, description: 'Item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CategoryEntity> {
    const ref = await this.refsService.findOne(id);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Update Category item by id
   * @param id
   * @param updateCategoryDto
   */
  @Private(AuthRole.Admin)
  @ApiOkResponse({ type: CategoryEntity, description: 'Result item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const ref = await this.refsService.update(id, updateCategoryDto);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Remove Category item by id
   * @param id
   */
  @Private(AuthRole.Admin)
  @ApiNoContentResponse({ description: 'Deleted' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    const ref = await this.refsService.findOne(id);
    if (!ref) throw new NotFoundException();

    const res: boolean = await this.refsService.remove(id);
    if (!res) throw new NotFoundException();

    this.removeBannerFile(ref);
  }

  /**
   * Read Category banner image contents
   * @param image
   * @param res
   * @param req
   */
  @ApiFileResponse('image/png', 'image/jpg', 'image/jpeg', 'image/gif')
  @Get('banners/:image')
  async sendFile(
    @Param('image') image: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    if (!CategoriesService.BANNER_MASK.test(image))
      throw new NotFoundException(image);
    return res.sendFile(
      image,
      {
        root: CategoriesService.FILE_DIRECTORY,
        maxAge: 86400000,
        headers: { "Expires": new Date(Date.now() + 2592000000).toUTCString() }
      },
      (err: any) => {
        err && req?.next && req.next(new NotFoundException(image));
      },
    );
  }

  /**
   * Assign banner image for the Category
   * @param id
   * @param bannerImage
   * @param updateCategoryImageDto
   */
  @Private(AuthRole.Admin)
  @ApiOkResponse({
    type: UpdateCategoryBannerDto,
    description: 'Result item By ID',
  })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: `The banner image file to upload`,
    type: UpdateCategoryImageDto,
  })
  @UseInterceptors(
    FileInterceptor(
      'bannerImage',
      getMulterImageOptions({
        storeFolder: CategoriesService.FILE_DIRECTORY,
        nameCallback: (
          req: Request,
          _: Express.Multer.File,
          filePart: FileNamePart,
        ): string => `${filePart.randomPart}${filePart.extPart}`,
      }),
    ),
  )
  @Patch(':id/banner')
  async uploadFile(
    @Param('id') id: number,
    @UploadedFile() bannerImage: Express.Multer.File,
    @Body() updateCategoryImageDto: UpdateCategoryImageDto,
  ): Promise<UpdateCategoryBannerDto> {
    const updateCategoryBannerDto: UpdateCategoryBannerDto = {
      ...updateCategoryImageDto,
      bannerImage: bannerImage.filename,
    };

    const storedRef = await this.refsService.findOne(id);
    if (!storedRef) {
      this.removeBannerFile(updateCategoryBannerDto);
      throw new NotFoundException();
    }

    this.removeBannerFile(storedRef);

    const ref = await this.refsService.update(id, updateCategoryBannerDto);
    if (!ref) {
      this.removeBannerFile(updateCategoryBannerDto);
      throw new NotFoundException();
    }

    return ref;
  }

  /**
   * Remove stored banner file image
   * @param ref
   * @private
   */
  private removeBannerFile(
    ref: CategoryEntity | UpdateCategoryBannerDto,
  ): void {
    if (ref.bannerImage) {
      unlink(join(CategoriesService.FILE_DIRECTORY, ref.bannerImage), (err) => {
        if (err) throw err;
      });
    }
  }
}
