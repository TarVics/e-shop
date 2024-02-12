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

import { CreateCurrencyDto, UpdateCurrencyDto } from '../dto';
import { CurrencyEntity } from '../entities';
import { CurrenciesService } from '../services';

/**
 * References / Currencies
 */
@Private(AuthRole.Admin)
@ApiTags('References / Currencies')
@Controller('refs/currencies')
export class CurrenciesController {
  constructor(private readonly refsService: CurrenciesService) {}

  /**
   * Read all Currency items
   */
  @ApiOkResponse({
    type: CurrencyEntity,
    isArray: true,
    description: 'Item list',
  })
  @Get()
  findAll(): Promise<CurrencyEntity[]> {
    return this.refsService.findAll();
  }

  /**
   * Create Currency item
   * @param createCurrencyRefDto
   */
  @ApiCreatedResponse({ type: CurrencyEntity, description: 'Item created' })
  @Post()
  create(
    @Body() createCurrencyRefDto: CreateCurrencyDto,
  ): Promise<CurrencyEntity> {
    return this.refsService.create(createCurrencyRefDto);
  }

  /**
   * Read Currency item by id
   * @param id
   */
  @ApiOkResponse({ type: CurrencyEntity, description: 'Item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CurrencyEntity> {
    const ref = await this.refsService.findOne(id);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Update Currency item by id
   * @param id
   * @param updateCurrencyRefDto
   */
  @ApiOkResponse({ type: CurrencyEntity, description: 'Result item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCurrencyRefDto: UpdateCurrencyDto,
  ): Promise<CurrencyEntity> {
    const ref = await this.refsService.update(id, updateCurrencyRefDto);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Remove Currency item by id
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
