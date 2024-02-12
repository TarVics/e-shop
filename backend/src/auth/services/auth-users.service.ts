import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

import { CreateUserDto, UpdateUserDto } from '../dto';
import { AuthUser } from '../entities';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/core/dtos';
import { AuthRole } from '../enums';

@Injectable()
export class AuthUsersService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly usersRepository: Repository<AuthUser>,
  ) {}

  /**
   * Create AuthUser item
   * @param createUserDto
   */
  async create(createUserDto: CreateUserDto): Promise<AuthUser> {
    const user = await this.usersRepository.save(createUserDto);
    return this.usersRepository.create(user);
  }

  /**
   * Read all AuthUser items
   * @param pageOptionsDto
   */
  public async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<AuthUser>> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    /*
        if (role) {
          role = role.toLowerCase();
          queryBuilder.andWhere('user.role = :role', { role });
        }
    */

    queryBuilder
      .orderBy('user.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto,
    });

    return new PageDto(entities, pageMetaDto);
  }

  /**
   * Read AuthUser item by role
   * @param role
   */
  findByRole(role: AuthRole): Promise<AuthUser[]> {
    return this.usersRepository.findBy({ role });
  }

  /**
   * Read AuthUser item by email
   * @param email
   */
  findOneByEmail(email: string): Promise<AuthUser | null> {
    return this.usersRepository.findOneBy({ email });
  }

  /**
   * Read AuthUser item by id
   * @param id
   */
  findOneById(id: number): Promise<AuthUser | null> {
    return this.usersRepository.findOneBy({ id });
  }

  /**
   * Update AuthUser item by id
   * @param id
   * @param updateUserDto
   */
  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update({ id }, updateUserDto);
  }

  /**
   * Remove AuthUser item by id
   * @param id
   */
  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete({ id });
  }
}
