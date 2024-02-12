import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SchedulerRegistry } from '@nestjs/schedule';

import { DataSource, LessThan, QueryRunner, Repository } from 'typeorm';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

import { CronJob } from 'cron';
import ms from 'ms';

import { MailService } from 'src/mail/mail.service';

import { JwtConfig, TokenConfig } from '../auth.options';
import {
  ChangePasswordDto,
  CreateUserDto,
  JwtPairDto,
  LoginUserDto,
  RecoverRequestDto,
  RegisterUserDto,
} from '../dto';

import { AuthTokenKind, MysqlErrnoEnum, TokenKind } from '../enums';
import { AuthUser, AuthToken } from '../entities';
import { UserAlreadyExistException } from '../exceptions';
import { AuthenticationProvider } from '../providers';
import { JwtPayload } from '../strategies';
import { AuthUsersService } from './auth-users.service';
import { I18nLocale } from '../../core/enums';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    @Inject(JwtConfig.KEY)
    private readonly jwt: ConfigType<typeof JwtConfig>,
    @InjectRepository(AuthToken)
    private readonly tokensRepository: Repository<AuthToken>,
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly usersService: AuthUsersService,
  ) {
    this.registerEraserCronJob();
  }

  async validateJwtToken(
    payload: JwtPayload,
    kind: TokenKind,
    token: string,
  ): Promise<AuthUser> {
    const id: number = parseInt(payload.sub || '', 10);
    if (!id || id < 0) throw new UnauthorizedException();

    if (TokenKind.Access === kind) {
      const user = await this.usersService.findOneById(id);
      if (!user || !user.active || !user.refreshToken)
        throw new UnauthorizedException();

      return user;
    } else if (TokenKind.Refresh === kind) {
      const user = await this.usersService.findOneById(id);
      if (!user || !user.active || !user.refreshToken)
        throw new UnauthorizedException();

      const tokenValid: boolean = await AuthenticationProvider.verifyHash(
        user.refreshToken,
        token,
      );
      if (!tokenValid) throw new UnauthorizedException();

      return user;
    } else {
      const authToken = await this.tokensRepository.findOne({
        where: { id },
        relations: { user: true },
      });
      if (!authToken) throw new UnauthorizedException();

      const tokenValid: boolean = await AuthenticationProvider.verifyHash(
        authToken.token,
        token,
      );
      if (!tokenValid) throw new UnauthorizedException();

      await this.tokensRepository.delete({ id });

      return authToken.user;
    }
  }

  async recover(
    recoverRequestDto: RecoverRequestDto,
    locale: I18nLocale,
  ): Promise<void> {
    const user = await this.usersService.findOneByEmail(
      recoverRequestDto.email,
    );

    if (!user) return;

    await this.dataSource.transaction(
      async (manager: EntityManager): Promise<void> => {
        const token: string = await this.createToken(
          manager,
          user,
          AuthTokenKind.Recover,
        );
        this.mailService.sendUserRecoverPassword(user, token, locale);
      },
    );
  }

  async recoverConfirm(
    user: AuthUser,
    registerUserDto: RegisterUserDto,
  ): Promise<JwtPairDto> {
    if (user.email !== registerUserDto.email)
      throw new UnauthorizedException('User or password is not valid');

    const tokens: JwtPairDto = await this.refreshTokens(user);

    await this.usersService.update(user.id, {
      password: registerUserDto.password,
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  async register(
    createUserDto: CreateUserDto,
    locale: I18nLocale,
  ): Promise<void> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manager: EntityManager = queryRunner.manager;

      const userDto = await manager.save(AuthUser, createUserDto);
      const user = manager.create(AuthUser, userDto);

      const token: string = await this.createToken(
        manager,
        user,
        AuthTokenKind.Register,
      );
      this.mailService.sendUserRegisterConfirm(user, token, locale);

      await queryRunner.commitTransaction();
    } catch (error) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();

      if (error?.errno === MysqlErrnoEnum.UniqueViolation) {
        throw new UserAlreadyExistException();
      }

      throw new InternalServerErrorException();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async registerConfirm(user: AuthUser): Promise<JwtPairDto> {
    const tokens: JwtPairDto = await this.refreshTokens(user);
    await this.usersService.update(user.id, {
      refreshToken: tokens.refreshToken,
      active: true,
    });
    return tokens;
  }

  registerEraserCronJob() {
    const job = new CronJob(this.jwt.removeExpire, async () => {
      this.logger.log('Removing overdue tokens...');
      await this.tokensRepository.delete({ expires: LessThan(new Date()) });
      // .createQueryBuilder("token")
      // .delete()
      // .where({ expires: LessThan(new Date()) });
    });

    this.schedulerRegistry.addCronJob('Removing overdue tokens', job);

    job.start();
  }

  async login(data: LoginUserDto): Promise<JwtPairDto> {
    const user = await this.usersService.findOneByEmail(data.email);
    if (!user) throw new UnauthorizedException('User or password is not valid');

    const passwordValid: boolean = await AuthenticationProvider.verifyHash(
      user.password,
      data.password,
    );
    if (!passwordValid)
      throw new UnauthorizedException('User or password is not valid');

    if (!user.active) throw new UnauthorizedException('User is not active');

    return this.refreshUserTokens(user);
  }

  async changePassword(
    user: AuthUser,
    passwordDto: ChangePasswordDto,
  ): Promise<void> {
    const passwordValid: boolean = await AuthenticationProvider.verifyHash(
      user.password,
      passwordDto.oldPassword,
    );
    if (!passwordValid)
      throw new UnauthorizedException('User or password is not valid');

    await this.usersService.update(user.id, {
      password: passwordDto.newPassword,
    });
  }

  async logout(user: AuthUser): Promise<void> {
    await this.usersService.update(user.id, { refreshToken: null });
  }

  async refreshUserTokens(user: AuthUser): Promise<JwtPairDto> {
    const tokens: JwtPairDto = await this.refreshTokens(user);

    await this.usersService.update(user.id, {
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  private async refreshTokens(user: AuthUser): Promise<JwtPairDto> {
    const payload: JwtPayload = { sub: user.id.toString() };

    const tokenAccess: TokenConfig = this.jwt.tokens[TokenKind.Access];
    const tokenRefresh: TokenConfig = this.jwt.tokens[TokenKind.Refresh];

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: tokenAccess.secret,
        expiresIn: tokenAccess.expire,
      }),
      this.jwtService.signAsync(payload, {
        secret: tokenRefresh.secret,
        expiresIn: tokenRefresh.expire,
      }),
    ]);

    const tokens: JwtPairDto = { accessToken, refreshToken };

    return tokens;
  }

  async createToken(
    manager: EntityManager,
    user: AuthUser,
    tokenKind: AuthTokenKind,
  ): Promise<string> {
    let authToken = await manager.findOneBy(AuthToken, {
      userId: user.id,
      kind: tokenKind,
    });

    if (!authToken) {
      authToken = await manager.save(AuthToken, {
        userId: user.id,
        kind: tokenKind,
        expires: new Date(),
      });
    }

    const payload: JwtPayload = { sub: authToken.id.toString() };
    const options: TokenConfig = this.jwt.tokens[tokenKind];
    const secret: string = options.secret;
    const expiresIn: string = options.expire;

    const tokenValue = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn,
    });

    await manager.update(AuthToken, authToken.id, {
      token: tokenValue,
      kind: tokenKind,
      expires: new Date(Date.now() + ms(expiresIn)),
    });

    return tokenValue;
  }
}
