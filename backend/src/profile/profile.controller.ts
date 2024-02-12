import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUser, Private } from '../auth/decorators';
import { AuthUser } from '../auth/entities';

import { UpdateProfileDto, ViewProfileDto } from "./dto";
import { ProfileEntity } from './entities';
import { ProfileService } from './profile.service';

/**
 * User Profile Information
 */
@Private()
@Controller('profile')
@ApiTags('User Profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Get User Profile Information
   * @param user
   */
  @ApiOkResponse({ type: ViewProfileDto, description: 'Success' })
  @Get()
  findOne(@CurrentUser() user: AuthUser): Promise<ViewProfileDto> {
    return this.profileService.findOneById(user);
  }

  /**
   * Update User Profile Information
   * @param user
   * @param updateProfileDto
   */
  @ApiOkResponse({ type: ViewProfileDto, description: 'Success' })
  @HttpCode(HttpStatus.OK)
  @Post()
  async update(
    @CurrentUser() user: AuthUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ViewProfileDto> {
    return this.profileService.update(user, updateProfileDto);
  }
}
