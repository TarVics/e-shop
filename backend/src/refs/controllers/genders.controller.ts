import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
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

import { CreateRefDto, UpdateRefDto } from '../dto';
import { GendersService } from '../services';
import { GenderEntity } from '../entities';

/**
 * References / Genders
 */
@Private(AuthRole.Admin)
@ApiTags('References / Genders')
@Controller('refs/genders')
export class GendersController {
  constructor(private readonly refsService: GendersService) {}

  /**
   * Read all Gender items
   */
  @ApiOkResponse({
    type: GenderEntity,
    isArray: true,
    description: 'Item list',
  })
  @Get()
  findAll(): Promise<GenderEntity[]> {
    return this.refsService.findAll();
  }

  /**
   * Create Gender item
   * @param createRefDto
   */
  @ApiCreatedResponse({ type: GenderEntity, description: 'Item created' })
  @Post()
  create(@Body() createRefDto: CreateRefDto): Promise<GenderEntity> {
    return this.refsService.create(createRefDto);
  }

  /**
   * Read Gender item by id
   * @param id
   */
  @ApiOkResponse({ type: GenderEntity, description: 'Item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<GenderEntity> {
    const ref = await this.refsService.findOne(id);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Update Gender item by id
   * @param id
   * @param updateRefDto
   */
  @ApiOkResponse({ type: GenderEntity, description: 'Result item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRefDto: UpdateRefDto,
  ): Promise<GenderEntity> {
    const ref = await this.refsService.update(id, updateRefDto);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Remove Gender item by id
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
