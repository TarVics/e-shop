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

import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from '../dto';
import { PaymentMethodEntity } from '../entities';
import { PaymentMethodsService } from '../services';

/**
 * References / Payment Methods
 */
@Private(AuthRole.Admin)
@ApiTags('References / Payment Methods')
@Controller('refs/payment-methods')
export class PaymentMethodsController {
  constructor(private readonly refsService: PaymentMethodsService) {}

  /**
   * Read all Payment Method items
   */
  @ApiOkResponse({
    type: PaymentMethodEntity,
    isArray: true,
    description: 'Item list',
  })
  @Get()
  findAll(): Promise<PaymentMethodEntity[]> {
    return this.refsService.findAll();
  }

  /**
   * Create Payment Method item
   * @param createPaymentMethodRefDto
   */
  @ApiCreatedResponse({
    type: PaymentMethodEntity,
    description: 'Item created',
  })
  @Post()
  create(
    @Body() createPaymentMethodRefDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethodEntity> {
    return this.refsService.create(createPaymentMethodRefDto);
  }

  /**
   * Read Payment Method item by id
   * @param id
   */
  @ApiOkResponse({ type: PaymentMethodEntity, description: 'Item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PaymentMethodEntity> {
    const ref = await this.refsService.findOne(id);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Update Payment Method item by id
   * @param id
   * @param updatePaymentMethodRefDto
   */
  @ApiOkResponse({
    type: PaymentMethodEntity,
    description: 'Result item By ID',
  })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePaymentMethodRefDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethodEntity> {
    const ref = await this.refsService.update(id, updatePaymentMethodRefDto);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Remove Payment Method item by id
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
