import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

import { Private } from '../../auth/decorators';
import { AuthRole } from '../../auth/enums';

import { CreateShippingMethodDto, UpdateShippingMethodDto } from '../dto';
import { ShippingMethodEntity } from '../entities';
import { ShippingMethodsService } from '../services';

/**
 * References / Shipping Methods
 */
@Private(AuthRole.Admin)
@ApiTags('References / Shipping Methods')
@Controller('refs/shipping-methods')
export class ShippingMethodsController {
  constructor(private readonly refsService: ShippingMethodsService) {}

  /**
   * Read all Shipping Method items
   */
  @ApiOkResponse({
    type: ShippingMethodEntity,
    isArray: true,
    description: 'Item list',
  })
  @Get()
  findAll(): Promise<ShippingMethodEntity[]> {
    return this.refsService.findAll();
  }

  /**
   * Create Shipping Method item
   * @param createShippingMethodRefDto
   */
  @ApiCreatedResponse({
    type: ShippingMethodEntity,
    description: 'Item created',
  })
  @Post()
  create(
    @Body() createShippingMethodRefDto: CreateShippingMethodDto,
  ): Promise<ShippingMethodEntity> {
    return this.refsService.create(createShippingMethodRefDto);
  }

  /**
   * Read Shipping Method item by id
   * @param id
   */
  @ApiOkResponse({ type: ShippingMethodEntity, description: 'Item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ShippingMethodEntity> {
    const ref = await this.refsService.findOne(id);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Update Shipping Method item by id
   * @param id
   * @param updateShippingMethodRefDto
   */
  @ApiOkResponse({
    type: ShippingMethodEntity,
    description: 'Result item By ID',
  })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateShippingMethodRefDto: UpdateShippingMethodDto,
  ): Promise<ShippingMethodEntity> {
    const ref = await this.refsService.update(id, updateShippingMethodRefDto);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Remove Shipping Method item by id
   * @param id
   */
  @ApiNoContentResponse({ description: 'Deleted' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    const res: boolean = await this.refsService.remove(id);
    if (!res) throw new NotFoundException();
  }
}
