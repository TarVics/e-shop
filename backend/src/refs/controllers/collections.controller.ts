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
  BadRequestException,
} from '@nestjs/common';

import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileNamePart, getMulterImageOptions } from '../../core/utils';
import { ApiFileResponse } from '../../core/decorators';

import { Private } from '../../auth/decorators';
import { AuthRole } from '../../auth/enums';

import {
  CreateCollectionBannerDto,
  CreateCollectionBannerImageDto,
  CreateCollectionDto,
  UpdateCollectionDto,
} from '../dto';

import { CollectionBannerEntity, CollectionEntity } from '../entities';
import { CollectionBannersService, CollectionsService } from '../services';
import { BannerKind } from '../enums';

/**
 * References / Collections
 */
@ApiTags('References / Collections')
@Controller('refs/collections')
export class CollectionsController {
  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly bannersService: CollectionBannersService,
  ) {}

  /**
   * Read all Collection items
   */
  @Private(AuthRole.Admin)
  @ApiOkResponse({
    type: CollectionEntity,
    isArray: true,
    description: 'Item list',
  })
  @Get()
  findAll(): Promise<CollectionEntity[]> {
    return this.collectionsService.findAll();
  }

  /**
   * Create Collection item
   * @param createCollectionDto
   */
  @Private(AuthRole.Admin)
  @ApiCreatedResponse({ type: CollectionEntity, description: 'Item created' })
  @Post()
  create(
    @Body() createCollectionDto: CreateCollectionDto,
  ): Promise<CollectionEntity> {
    return this.collectionsService.create(createCollectionDto);
  }

  /**
   * Read Collection item by id
   * @param id
   */
  @Private(AuthRole.Admin)
  @ApiOkResponse({ type: CollectionEntity, description: 'Item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CollectionEntity> {
    const ref = await this.collectionsService.findOne(id);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Update Collection item by id
   * @param id
   * @param updateCollectionDto
   */
  @Private(AuthRole.Admin)
  @ApiOkResponse({ type: CollectionEntity, description: 'Result item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ): Promise<CollectionEntity> {
    const ref = await this.collectionsService.update(id, updateCollectionDto);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Remove Collection item by id
   * @param id
   */
  @Private(AuthRole.Admin)
  @ApiNoContentResponse({ description: 'Deleted' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    const ref = await this.collectionsService.findOne(id);
    if (!ref) throw new NotFoundException();

    const res: boolean = await this.collectionsService.remove(id);
    if (!res) throw new NotFoundException();

    ref.banners.forEach((obj) => this.removeBannerFile(obj.banner));
  }

  /**
   * Read Collection banner image contents
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
    if (!CollectionsService.BANNER_MASK.test(image))
      throw new NotFoundException(image);
    return res.sendFile(
      image,
      {
        root: CollectionsService.FILE_DIRECTORY,
        maxAge: 86400000,
        headers: { "Expires": new Date(Date.now() + 2592000000).toUTCString() }
      },
      (err) => {
        err && req?.next && req.next(new NotFoundException(image));
      },
    );
  }

  /////////////////////////////////////////////////////////////////////////////

  /**
   * Read all Collection Banners items
   */
  @Private(AuthRole.Admin)
  @ApiOkResponse({
    type: CollectionBannerEntity,
    isArray: true,
    description: 'Item list',
  })
  @ApiQuery({ name: 'collectionId', type: Number, required: false })
  @Get(':collectionId/banners')
  findAllBanners(
    @Param('collectionId') collectionId: number,
  ): Promise<CollectionBannerEntity[]> {
    return this.bannersService.findAll(collectionId);
  }

  /**
   * Create Collection Banner item
   * @param collectionId
   * @param kind
   * @param banner
   */
  @Private(AuthRole.Admin)
  @ApiCreatedResponse({
    type: CollectionBannerEntity,
    description: 'Item created',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: `The banner image item to upload`,
    type: CreateCollectionBannerImageDto,
  })
  @UseInterceptors(
    FileInterceptor(
      'banner',
      getMulterImageOptions({
        storeFolder: CollectionsService.FILE_DIRECTORY,
        nameCallback: (
          req: Request,
          file: Express.Multer.File,
          filePart: FileNamePart,
        ): string =>
          `${req.body?.kind || ''}-${filePart.randomPart}${filePart.extPart}`,
      }),
    ),
  )
  @Post(':collectionId/banners')
  createBanner(
    @Param('collectionId') collectionId: number,
    @Body('kind') kind: BannerKind,
    @UploadedFile() banner: Express.Multer.File,
  ): Promise<CollectionBannerEntity> {
    const bannerKinds = Object.values(BannerKind);
    if (!bannerKinds.includes(kind)) {
      this.removeBannerFile(banner.filename);
      throw new BadRequestException(
        'kind must be one of the following values: ' + bannerKinds.join(', '),
      );
    }

    try {
      const createCollectionBannerDto: CreateCollectionBannerDto = {
        kind,
        collectionId,
        banner: banner.filename,
      };

      return this.bannersService.create(createCollectionBannerDto);
    } catch (e) {
      this.removeBannerFile(banner.filename);
      throw e;
    }
  }

  /**
   * Read Collection Banner item by id
   * @param collectionId
   * @param id
   */
  @Private(AuthRole.Admin)
  @ApiOkResponse({ type: CollectionBannerEntity, description: 'Item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Get(':collectionId/banners/:id')
  async findOneBanner(
    @Param('collectionId') collectionId: number,
    @Param('id') id: number,
  ): Promise<CollectionBannerEntity> {
    const ref = await this.bannersService.findOne(id, collectionId);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Remove Collection Banner item by id
   * @param collectionId
   * @param id
   */
  @Private(AuthRole.Admin)
  @ApiNoContentResponse({ description: 'Deleted' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':collectionId/banners/:id')
  async removeBanner(
    @Param('collectionId') collectionId: number,
    @Param('id') id: number,
  ): Promise<void> {
    const ref = await this.bannersService.findOne(id, collectionId);
    if (!ref) throw new NotFoundException();

    const res: boolean = await this.bannersService.remove(id);
    if (!res) throw new NotFoundException();

    this.removeBannerFile(ref.banner);
  }

  /**
   * Remove loaded banner file image
   * @param banner
   * @private
   */
  private removeBannerFile(banner: string): void {
    if (banner) {
      unlink(join(CollectionsService.FILE_DIRECTORY, banner), (err) => {
        if (err) throw err;
      });
    }
  }
}
