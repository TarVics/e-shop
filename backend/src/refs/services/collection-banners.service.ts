import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

import { CreateCollectionBannerDto } from '../dto';
import { CollectionBannerEntity } from '../entities';

@Injectable()
export class CollectionBannersService {
  constructor(
    @InjectRepository(CollectionBannerEntity)
    private readonly repository: Repository<CollectionBannerEntity>,
  ) {}

  /**
   * Create Collection banner item
   * @param createCollectionBannerDto
   */
  async create(
    createCollectionBannerDto: CreateCollectionBannerDto,
  ): Promise<CollectionBannerEntity> {
    const ref = await this.repository.save(createCollectionBannerDto);
    return this.repository.create(ref);
  }

  /**
   * Read Collection banner items
   */
  findAll(collectionId: number): Promise<CollectionBannerEntity[]> {
    return this.repository.findBy({ collectionId });
  }

  /**
   * Read Collection banner item by id
   * @param id
   * @param collectionId
   */
  findOne(
    id: number,
    collectionId: number,
  ): Promise<CollectionBannerEntity | null> {
    return this.repository.findOneBy({ id, collectionId });
  }

  /**
   * Remove Collection banner item by id
   * @param id
   */
  async remove(id: number): Promise<boolean> {
    const res: DeleteResult = await this.repository.delete(id);
    return !!res.affected;
  }
}
