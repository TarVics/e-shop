import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import { AuthUser } from '../auth/entities';
import { UpdateProfileDto, ViewProfileDto } from "./dto";
import { ProfileEntity } from './entities';
import { plainToInstance } from "class-transformer";
import { getApiModelProperties } from "../core/utils";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly dataSource: DataSource,
  ) {}

  makeView(profile: ProfileEntity): ViewProfileDto {
    const view: Record<string, any> = {};

    getApiModelProperties(ViewProfileDto)
      .forEach((name: string): void => {
        view[name] = profile[name as keyof ProfileEntity];
      });

    return plainToInstance(ViewProfileDto, view, { enableImplicitConversion: true });
  }

  async findOneById(user: AuthUser): Promise<ViewProfileDto> {
    const profile: ProfileEntity =
      (await this.profileRepository
        .createQueryBuilder('profile')
        .where('profile.id = :id', { id: user.id })
        .getOne()) || this.profileRepository.create();

    profile.assignUser(user);

    return this.makeView(profile);
  }

  /**
   * Update User profile information
   * @param user
   * @param updateProfileDto
   */
  async update(
    user: AuthUser,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ViewProfileDto> {
    return await this.dataSource.transaction(
      async (manager: EntityManager): Promise<ViewProfileDto> => {
        const { firstName, lastName } = updateProfileDto;
        const id: number = user.id;

        if (firstName !== user.firstName || lastName !== user.lastName) {
          await manager.update(AuthUser, { id }, { firstName, lastName });

          user.firstName = firstName || null;
          user.lastName = lastName || null;
        }

        const profile: ProfileEntity = this.profileRepository.create({
          ...updateProfileDto,
          user,
        });

        const result: UpdateResult = await manager.update(
          ProfileEntity,
          { id },
          profile,
        );
        if (!result.affected) {
          await manager.insert(ProfileEntity, profile);
        }

        return this.makeView(profile);
      },
    );
  }
}
