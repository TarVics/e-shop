import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { Private, PrivateBy, CurrentUser } from '../decorators';
import {
  RegisterUserDto,
  LoginUserDto,
  CreateUserDto,
  JwtPairDto,
  ChangePasswordDto,
  RecoverRequestDto,
} from '../dto';
import { AuthUser } from '../entities';
import { RecoverJwtGuard, RefreshJwtGuard, RegisterJwtGuard } from '../guards';
import { AuthService } from '../services';
import { LangDto } from '../../core/dtos';

/**
 * User authentication and authorization management
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Information about the current authenticated user
   * @param user
   */
  @ApiOperation({ summary: 'Information about the current authenticated user' })
  @Private()
  @ApiOkResponse({ description: 'Success', type: AuthUser })
  @Get()
  info(@CurrentUser() user: AuthUser): AuthUser {
    return user;
  }

  /**
   * New user registration
   * @param createUserDto
   * @param locale
   */
  @ApiNoContentResponse({
    description: 'Successfully registered inactive user',
  })
  @ApiBadRequestResponse({
    description: 'User with that email already exists.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiQuery({ type: LangDto, description: 'Language value' })
  @Post('register')
  register(
    @Body() createUserDto: CreateUserDto,
    @Query() locale: LangDto,
  ): Promise<void> {
    return this.authService.register(createUserDto, locale.lang);
  }

  /**
   * Email confirmation followed by setting the user's activity status
   * @param user
   */
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer JWT register token',
  })
  @PrivateBy(RegisterJwtGuard)
  @ApiOkResponse({
    type: JwtPairDto,
    description: 'Successfully activated user',
  })
  @HttpCode(HttpStatus.OK)
  @Post('register/confirm')
  registerConfirm(@CurrentUser() user: AuthUser): Promise<JwtPairDto> {
    return this.authService.registerConfirm(user);
  }

  /**
   * User authentication
   * @param data
   */
  @ApiOkResponse({
    type: JwtPairDto,
    description: 'Successfully authentication',
  })
  @ApiBadRequestResponse({ description: 'User or password is not valid' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() data: LoginUserDto): Promise<JwtPairDto> {
    return this.authService.login(data);
  }

  /**
   * User logout
   * @param user
   */
  @Private()
  @ApiNoContentResponse({ description: 'Successfully logout' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  async logout(@CurrentUser() user: AuthUser): Promise<void> {
    await this.authService.logout(user);
  }

  /**
   * Refresh user JWT keys pair
   * @param user
   */
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer JWT refresh token',
  })
  @PrivateBy(RefreshJwtGuard)
  @ApiOkResponse({
    type: JwtPairDto,
    description: 'Successfully generated token pair',
  })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshTokens(@CurrentUser() user: AuthUser): Promise<JwtPairDto> {
    return this.authService.refreshUserTokens(user);
  }

  /**
   * Changing the password of the currently authenticated user
   * @param user
   * @param passwordDto
   */
  @Private()
  @ApiNoContentResponse({
    description: 'Password has been successfully changed',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('password')
  changePassword(
    @CurrentUser() user: AuthUser,
    @Body() passwordDto: ChangePasswordDto,
  ): Promise<void> {
    return this.authService.changePassword(user, passwordDto);
  }

  /**
   * User password recovery request generation
   * @param recoverRequestDto
   * @param locale
   */
  @ApiNoContentResponse({
    description: 'An email has been sent for password recovery',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiQuery({ type: LangDto, description: 'Language value' })
  @Post('recover')
  recover(
    @Body() recoverRequestDto: RecoverRequestDto,
    @Query() locale: LangDto,
  ): Promise<void> {
    return this.authService.recover(recoverRequestDto, locale.lang);
  }

  /**
   * Setting a new password in response to a generated user password recovery
   * request
   * @param user
   * @param registerUserDto
   */
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer JWT recover token',
  })
  @PrivateBy(RecoverJwtGuard)
  @ApiOkResponse({
    type: JwtPairDto,
    description: 'Password has been successfully changed',
  })
  @ApiBadRequestResponse({ description: 'User or password is not valid' })
  @HttpCode(HttpStatus.OK)
  @Post('recover/confirm')
  recoverConfirm(
    @CurrentUser() user: AuthUser,
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<JwtPairDto> {
    return this.authService.recoverConfirm(user, registerUserDto);
  }
}
