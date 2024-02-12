import { join } from "node:path";
import type { Request, Response } from "express";

import { Controller, Get, Param, Query, Req, Res } from "@nestjs/common";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from "@nestjs/swagger";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";

import { ApiFileResponse, ApiPaginatedResponse } from "../../core/decorators";
import { PageDto } from "../../core/dtos";

import { ProductsService } from "../../refs/services";
import { OptionsProductsPageDto, ViewProductDto } from "../../refs/dto";
import { ParamsUidDto } from "../dto";
import { OptionsProductDto } from "../../refs/dto/options-product.dto";

/**
 * Shop / Products
 */
@ApiTags("Shop / Products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  /**
   * Read Product image contents
   * @param image
   * @param res
   * @param req
   */
  @ApiFileResponse("image/png", "image/jpg", "image/jpeg", "image/gif")
  @Get("images/:image")
  async sendFile(
    @Param("image") image: string,
    @Res() res: Response,
    @Req() req: Request
  ) {
    if (!new RegExp(ProductsService.IMAGE_MASK).test(image))
      throw new NotFoundException(image);
    const root: string = join(
      ProductsService.FILE_DIRECTORY,
      image.split("-")[0]
    );
    return res.sendFile(image,
      {
        root,
        maxAge: 86400000,
        headers: { "Expires": new Date(Date.now() + 2592000000).toUTCString() }
      },
      (err: any) => {
        err && req?.next && req.next(new NotFoundException(image));
      }
    );
  }

  /**
   * Read all Product items
   * @param productsPageOptionsDto
   */
  @ApiPaginatedResponse(ViewProductDto)
  @Get()
  findAllView(
    @Query() productsPageOptionsDto: OptionsProductsPageDto
  ): Promise<PageDto<ViewProductDto>> {
    return this.productsService.findAllView(productsPageOptionsDto);
  }

  /**
   * Read Product item by uid
   * @param params
   * @param options
   */
  @ApiOkResponse({ type: ViewProductDto, description: "Item By UID" })
  @ApiNotFoundResponse({ description: "Item does not exists" })
  @ApiQuery({ type: OptionsProductDto, description: "Item show params" })
  @Get(":uid")
  async findOneView(
    @Param() params: ParamsUidDto,
    @Query() options: OptionsProductDto
  ): Promise<ViewProductDto> {
    const entity = await this.productsService.findOneView(
      params.uid,
      options.lang,
      options.models
    );
    if (!entity) throw new NotFoundException();

    return entity;
  }
}
