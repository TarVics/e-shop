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
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

import { ApiPaginatedResponse } from '../../core/decorators';
import { PageDto } from '../../core/dtos';

import { AuthUser } from '../../auth/entities';
import { CurrentUser, Private } from '../../auth/decorators';

import {
  CreateOrderDto,
  OptionsOrderPageDto,
  ParamsUidDto,
  UpdateOrderDto,
  UpdateOrderStatusDto,
  ViewOrderDto,
} from '../dto';
import { OrderEntity } from '../entities';
import { OrdersService } from '../services';
import { AuthRole } from '../../auth/enums';
import { OptionsRefDto } from '../../refs/dto';

/**
 * Shop / Orders
 */
@ApiTags('Shop / Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Read all Order items
   * @param user
   * @param options
   */
  @Private()
  @ApiPaginatedResponse(OrderEntity)
  @Get()
  findAll(
    @CurrentUser() user: AuthUser,
    @Query() options: OptionsOrderPageDto,
  ): Promise<PageDto<ViewOrderDto>> {
    return this.ordersService.findAll(options, user);
  }

  /**
   * Read Order item by uid
   * @param user
   * @param params
   * @param options
   */
  @Private()
  @ApiOkResponse({ type: OrderEntity, description: 'Item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Get(':uid')
  async findOne(
    @CurrentUser() user: AuthUser,
    @Param() params: ParamsUidDto,
    @Query() options: OptionsRefDto,
  ): Promise<ViewOrderDto> {
    const entity = await this.ordersService.findOne(params.uid, user, options);
    if (!entity) throw new NotFoundException();
    return entity;
  }

  /**
   * Create Order item
   * @param user
   * @param createOrderDto
   * @param options
   */
  @Private()
  @ApiCreatedResponse({ type: OrderEntity, description: 'Item created' })
  @Post()
  async create(
    @CurrentUser() user: AuthUser,
    @Body() createOrderDto: CreateOrderDto,
    @Query() options: OptionsRefDto,
  ): Promise<ViewOrderDto> {
    const entity = await this.ordersService.create(
      user,
      createOrderDto,
      options,
    );
    if (!entity) throw new NotFoundException('Product is not exists');
    return entity;
  }

  /**
   * Update Order item by uid
   * @param params
   * @param user
   * @param updateOrderDto
   * @param options
   */
  @Private()
  @ApiOkResponse({ type: OrderEntity, description: 'Result item By UID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @ApiForbiddenResponse({ description: 'Item is forbidden to change' })
  @Patch(':uid')
  async update(
    @CurrentUser() user: AuthUser,
    @Param() params: ParamsUidDto,
    @Body() updateOrderDto: UpdateOrderDto,
    @Query() options: OptionsRefDto,
  ): Promise<ViewOrderDto> {
    const entity = await this.ordersService.update(
      params.uid,
      user,
      updateOrderDto,
      options,
    );
    if (!entity) throw new NotFoundException();
    return entity;
  }

  /**
   * Update Order status by uid
   * @param params
   * @param user
   * @param updateOrderStatusDto
   * @param options
   */
  @Private(AuthRole.Operator)
  @ApiOkResponse({ type: OrderEntity, description: 'Result item By UID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @ApiForbiddenResponse({ description: 'Item is forbidden to change' })
  @Patch(':uid/status')
  async updateStatus(
    @CurrentUser() user: AuthUser,
    @Param() params: ParamsUidDto,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @Query() options: OptionsRefDto,
  ): Promise<ViewOrderDto> {
    const entity = await this.ordersService.updateState(
      params.uid,
      user,
      updateOrderStatusDto,
      options,
    );
    if (!entity) throw new NotFoundException();
    return entity;
  }

  /**
   * Remove Order item by uid
   * @param params
   * @param user
   */
  @Private(AuthRole.Operator)
  @ApiNoContentResponse({ description: 'Deleted' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':uid')
  async remove(
    @CurrentUser() user: AuthUser,
    @Param() params: ParamsUidDto,
  ): Promise<void> {
    const res: boolean = await this.ordersService.remove(params.uid, user);
    if (!res) throw new NotFoundException();
  }
}
