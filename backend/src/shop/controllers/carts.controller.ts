import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query
} from "@nestjs/common";

import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from "@nestjs/swagger";

import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";

import { CurrentUser, Private } from "../../auth/decorators";

import {
  CreateCartDto,
  ParamsUidDto,
  UpdateCartDto,
  ViewCartDto
} from "../dto";
import { CartsService } from "../services";
import { OptionsRefDto } from "../../refs/dto";
import { AuthUser } from "../../auth/entities";
import { AuthRole } from "../../auth/enums";

/**
 * Shop / Carts
 */
@ApiTags("Shop / Carts")
@Controller("carts")
export class CartsController {
  constructor(private readonly cartsService: CartsService) {
  }

  /**
   * Read Cart
   * @param params
   * @param options
   */
  @ApiOkResponse({ type: ViewCartDto, description: "Item contents" })
  @ApiNotFoundResponse({ description: "Item does not exists" })
  @Get(":uid")
  async findCart(
    @Param() params: ParamsUidDto,
    @Query() options: OptionsRefDto
  ): Promise<ViewCartDto> {
    const cart = await this.cartsService.findCartView(params.uid, options);
    if (!cart) throw new NotFoundException();
    return cart;
  }

  /**
   * Create Cart
   * @param createCartDto
   * @param options
   */
  @ApiCreatedResponse({ type: ViewCartDto, description: "Item created" })
  @Post()
  createCart(
    @Body() createCartDto: CreateCartDto,
    @Query() options: OptionsRefDto
  ): Promise<ViewCartDto> {
    return this.cartsService.createCartView(createCartDto, options);
  }

  /**
   * Update Cart
   * @param updateCartDto
   * @param options
   */
  @ApiCreatedResponse({ type: ViewCartDto, description: "Item updated" })
  @ApiNotFoundResponse({ description: "Item does not exists" })
  @Put()
  async updateCart(
    @Body() updateCartDto: UpdateCartDto,
    @Query() options: OptionsRefDto
  ): Promise<ViewCartDto> {
    const cart = await this.cartsService.updateCartView(updateCartDto, options);
    if (!cart) throw new NotFoundException();
    return cart;
  }

  /**
   * Update Cart by Operator
   * @param user
   * @param updateCartDto
   * @param options
   */
  @Private(AuthRole.Operator)
  @ApiCreatedResponse({ type: ViewCartDto, description: "Item updated" })
  @ApiNotFoundResponse({ description: "Item does not exists" })
  @Put()
  async updateCartByManager(
    @CurrentUser() user: AuthUser,
    @Body() updateCartDto: UpdateCartDto,
    @Query() options: OptionsRefDto
  ): Promise<ViewCartDto> {
    const cart = await this.cartsService.updateCartView(
      updateCartDto,
      options,
      user
    );
    if (!cart) throw new NotFoundException();
    return cart;
  }

  /**
   * Remove Cart uid
   * @param params
   */
  @Private()
  @ApiNoContentResponse({ description: "Deleted" })
  @ApiNotFoundResponse({ description: "Item does not exists" })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":uid")
  async removeCart(@Param() params: ParamsUidDto): Promise<void> {
    const res: boolean = await this.cartsService.removeCart(params.uid);
    if (!res) throw new NotFoundException();
  }
}
