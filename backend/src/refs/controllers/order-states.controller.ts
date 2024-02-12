import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
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

import {
  CreateOrderStateDto,
  OptionsRefDto,
  UpdateOrderStateDto,
  ViewOrderStateDto,
} from '../dto';
import { OrderStateEntity } from '../entities';
import { OrderStatesService } from '../services';

/**
 * References / Order States
 */
@ApiTags('References / Order States')
@Controller('refs/order-states')
export class OrderStatesController {
  constructor(private readonly refsService: OrderStatesService) {}

  /**
   * Order state items
   * @param refOptionsDto
   */
  @ApiOkResponse({ type: ViewOrderStateDto, description: 'All order states' })
  @Get('view')
  findOrderStates(
    @Query() refOptionsDto: OptionsRefDto,
  ): Promise<ViewOrderStateDto> {
    return this.refsService.findAllView(refOptionsDto.lang);
  }

  /**
   * Read all Order State items
   */
  @Private(AuthRole.Admin)
  @ApiOkResponse({
    type: OrderStateEntity,
    isArray: true,
    description: 'Item list',
  })
  @Get()
  findAll(): Promise<OrderStateEntity[]> {
    return this.refsService.findAll();
  }

  /**
   * Create Order State item
   * @param createOrderStateDto
   */
  @Private(AuthRole.Admin)
  @ApiCreatedResponse({ type: OrderStateEntity, description: 'Item created' })
  @Post()
  create(
    @Body() createOrderStateDto: CreateOrderStateDto,
  ): Promise<OrderStateEntity> {
    return this.refsService.create(createOrderStateDto);
  }

  /**
   * Read OrderState item by id
   * @param id
   */
  @Private(AuthRole.Admin)
  @ApiOkResponse({ type: OrderStateEntity, description: 'Item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<OrderStateEntity> {
    const ref = await this.refsService.findOne(id);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Update Order State item by id
   * @param id
   * @param updateRefDto
   */
  @Private(AuthRole.Admin)
  @ApiOkResponse({ type: OrderStateEntity, description: 'Result item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRefDto: UpdateOrderStateDto,
  ): Promise<OrderStateEntity> {
    const ref = await this.refsService.update(id, updateRefDto);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Remove Order State item by id
   * @param id
   */
  @Private(AuthRole.Admin)
  @ApiNoContentResponse({ description: 'Deleted' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    const res: boolean = await this.refsService.remove(id);
    if (!res) throw new NotFoundException();
  }
}
