import { unlink } from 'node:fs';
import { join } from 'node:path';
import type { Request } from 'express';

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
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
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
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

import {
  getApiModelProperties,
  getMulterImageOptions,
  FileNamePart,
} from '../../core/utils';
import { ApiFile, ApiPaginatedResponse } from '../../core/decorators';
import { PageDto, PageOptionsDto } from '../../core/dtos';

import { Private } from '../../auth/decorators';
import { AuthRole } from '../../auth/enums';

import {
  CreateProductDto,
  CreateProductImageDto,
  CreateProductImageMulterDto,
  UpdateProductDto,
  UpdateProductImageColumnDto,
} from '../dto';

import { ProductEntity, ProductImageEntity } from '../entities';
import { ProductImagesService, ProductsService } from '../services';

/**
 * References / Products
 */
@Private(AuthRole.Admin)
@ApiTags('References / Products')
@Controller('refs/products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly imagesService: ProductImagesService,
  ) {}

  /**
   * Read all Product items
   * @param pageOptionsDto
   */
  @ApiPaginatedResponse(ProductEntity)
  @Get()
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ProductEntity>> {
    return this.productsService.findAll(pageOptionsDto);
  }

  /**
   * Create Product item
   * @param createProductDto
   */
  @ApiCreatedResponse({ type: ProductEntity, description: 'Item created' })
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productsService.create(createProductDto);
  }

  /**
   * Read Product item by id
   * @param id
   */
  @ApiOkResponse({ type: ProductEntity, description: 'Item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProductEntity> {
    const entity = await this.productsService.findOne(id);
    if (!entity) throw new NotFoundException();

    return entity;
  }

  /**
   * Update Product item by id
   * @param id
   * @param updateProductDto
   */
  @ApiOkResponse({ type: ProductEntity, description: 'Result item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const entity = await this.productsService.update(id, updateProductDto);
    if (!entity) throw new NotFoundException();
    return entity;
  }

  /**
   * Remove Product item by id
   * @param id
   */
  @ApiNoContentResponse({ description: 'Deleted' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    const entity = await this.productsService.findOne(id);
    if (!entity) throw new NotFoundException();

    const images: ProductImageEntity[] = entity.images;

    const res: boolean = await this.productsService.remove(id);
    if (!res) throw new NotFoundException();

    this.removeImageFile(entity);
    images.forEach((image) => this.removeImageFiles(image));
  }

  /**
   * Assign column image for the Product
   * @param id
   * @param imageColumn
   */
  @ApiOkResponse({
    type: UpdateProductImageColumnDto,
    description: 'Result item By ID',
  })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @ApiFile('imageColumn')
  @UseInterceptors(
    FileInterceptor(
      'imageColumn',
      getMulterImageOptions({
        storeFolder: join(ProductsService.FILE_DIRECTORY, 'column'),
        nameCallback: (
          req: Request,
          _: Express.Multer.File,
          filePart: FileNamePart,
        ): string => `column-${filePart.randomPart}${filePart.extPart}`,
      }),
    ),
  )
  @Patch(':id/images')
  async uploadImage(
    @Param('id') id: number,
    @UploadedFile() imageColumn: Express.Multer.File,
  ): Promise<UpdateProductImageColumnDto> {
    const updateProductImageColumnDto: UpdateProductImageColumnDto = {
      imageColumn: imageColumn.filename,
    };

    const storedEntity = await this.productsService.findOne(id);
    if (!storedEntity) {
      this.removeImageFile(updateProductImageColumnDto);
      throw new NotFoundException();
    }

    this.removeImageFile(storedEntity);

    const entity = await this.productsService.update(
      id,
      updateProductImageColumnDto,
    );
    if (!entity) {
      this.removeImageFile(updateProductImageColumnDto);
      throw new NotFoundException();
    }

    return entity;
  }

  /**
   * Add details images for the Product
   * @param id
   * @param files
   */
  @ApiCreatedResponse({ type: ProductImageEntity, description: 'Item created' })
  @ApiNotFoundResponse({ description: 'Product does not exists' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Details image files to upload',
    type: CreateProductImageMulterDto,
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      getApiModelProperties(CreateProductImageMulterDto).map((name) => ({
        name,
        maxCount: 1,
      })),
      getMulterImageOptions({
        storeFolder: (_: Request, file: Express.Multer.File) =>
          join(
            ProductsService.FILE_DIRECTORY,
            file.fieldname.slice(5).toLowerCase(),
          ),
        nameCallback: (
          _: Request,
          file: Express.Multer.File,
          filePart: FileNamePart,
        ): string =>
          `${file.fieldname.slice(5).toLowerCase()}-${filePart.randomPart}${
            filePart.extPart
          }`,
      }),
    ),
  )
  @Post(':id/images')
  async uploadImages(
    @Param('id') id: number,
    @UploadedFiles() files: CreateProductImageMulterDto,
  ): Promise<ProductImageEntity> {
    console.log(files);

    const [imageMain] = files.imageMain;
    const [imageThumb] = files.imageThumb;

    const createProductImageDto: CreateProductImageDto = {
      productId: id,
      imageMain: imageMain.filename,
      imageThumb: imageThumb.filename,
    };

    const storedEntity = await this.productsService.findOne(id);
    if (!storedEntity) {
      this.removeImageFiles(createProductImageDto);
      throw new NotFoundException();
    }

    const entity: ProductImageEntity = await this.imagesService.create(
      createProductImageDto,
    );
    if (!entity) {
      this.removeImageFiles(createProductImageDto);
      throw new NotFoundException();
    }

    return entity;
  }

  /**
   * Remove details images for the Product by ID
   * @param id
   * @param imageId
   */
  @ApiNoContentResponse({ description: 'Deleted' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/images/:imageId')
  async removeImage(
    @Param('id') id: number,
    @Param('imageId') imageId: number,
  ): Promise<void> {
    const entity = await this.imagesService.findOne(imageId, id);
    if (!entity) throw new NotFoundException();

    const res: boolean = await this.imagesService.remove(imageId);
    if (!res) throw new NotFoundException();

    this.removeImageFiles(entity);
  }

  /**
   * Remove stored file image
   * @param entity
   * @private
   */
  private removeImageFile(entity: UpdateProductImageColumnDto): void {
    if (entity.imageColumn) {
      const image: string = join(
        ProductsService.FILE_DIRECTORY,
        entity.imageColumn.split('-')[0],
        entity.imageColumn,
      );

      unlink(image, (err) => {
        if (err) throw err;
      });
    }
  }

  /**
   * Remove stored file images
   * @param entity
   * @private
   */
  private removeImageFiles(entity: CreateProductImageDto): void {
    if (entity.imageMain) {
      const image: string = join(
        ProductsService.FILE_DIRECTORY,
        entity.imageMain.split('-')[0],
        entity.imageMain,
      );

      unlink(image, (err) => {
        if (err) throw err;
      });
    }

    if (entity.imageThumb) {
      const image: string = join(
        ProductsService.FILE_DIRECTORY,
        entity.imageThumb.split('-')[0],
        entity.imageThumb,
      );

      unlink(image, (err) => {
        if (err) throw err;
      });
    }
  }
}
