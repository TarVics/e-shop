import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

import { PageDto, PageOptionsDto } from 'src/core/dtos';
import { ApiPaginatedResponse } from 'src/core/decorators';

import { AuthRole } from '../enums';
import { AuthUser } from '../entities';
import { CurrentUser, Private } from '../decorators';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { AuthUsersService } from '../services';

/**
 * User management
 */
@Controller('auth/users')
@ApiTags('Authenticated users')
export class AuthUsersController {
  constructor(private readonly usersService: AuthUsersService) {}

  /**
   * Read all AuthUser items
   * @param pageOptionsDto
   */
  @Private(AuthRole.Admin)
  @ApiPaginatedResponse(AuthUser)
  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<AuthUser>> {
    return this.usersService.findAll(pageOptionsDto);
  }

  /**
   * Create AuthUser item
   * @param createUserDto
   */
  @Private(AuthRole.SuperAdmin)
  @ApiCreatedResponse({ type: AuthUser, description: 'User has been created' })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<AuthUser> {
    return this.usersService.create(createUserDto);
  }

  /**
   * Read AuthUser item by id
   * @param id
   */
  @Private(AuthRole.Admin)
  @ApiOkResponse({ type: AuthUser, description: 'Success' })
  @ApiNotFoundResponse({ description: 'User Not Found' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AuthUser> {
    const user = await this.usersService.findOneById(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  /**
   * Update AuthUser item by id
   * @param id
   * @param user
   * @param updateUserDto
   */
  @Private(AuthRole.SuperAdmin)
  @ApiBadRequestResponse({ description: 'No data to update' })
  @ApiNoContentResponse({ description: 'User information has been changed' })
  @ApiNotFoundResponse({ description: 'User Not Found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @CurrentUser() user: AuthUser,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const otherUser: boolean = id !== user.id;
    const dto: UpdateUserDto = {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      role: otherUser ? updateUserDto.role : undefined,
      active: otherUser ? updateUserDto.active : undefined,
    };

    if (Object.values(dto).every((value) => typeof value === undefined))
      throw new HttpException('No data to update', HttpStatus.BAD_REQUEST);

    const res: UpdateResult = await this.usersService.update(id, dto);

    if (!res.affected) throw new NotFoundException();
  }

  /**
   * Remove AuthUser item by id
   * @param id
   */
  @Private(AuthRole.SuperAdmin)
  @ApiNoContentResponse({ description: 'User has been removed' })
  @ApiNotFoundResponse({ description: 'User Not Found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    const res: DeleteResult = await this.usersService.remove(id);
    if (!res.affected) throw new NotFoundException();
  }
}
