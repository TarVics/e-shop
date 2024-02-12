import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import { CreateRefDto, UpdateRefDto } from '../dto';
import { BrandEntity } from '../entities';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly refsRepository: Repository<BrandEntity>,
  ) {}

  /**
   * Create Brand item
   * @param createRefDto
   */
  async create(createRefDto: CreateRefDto): Promise<BrandEntity> {
    const ref = await this.refsRepository.save(createRefDto);
    return this.refsRepository.create(ref);
  }

  /**
   * Read all Brand items
   */
  findAll(): Promise<BrandEntity[]> {
    return this.refsRepository.find();
  }

  /**
   * Read Brand item by id
   * @param id
   */
  findOne(id: number): Promise<BrandEntity | null> {
    return this.refsRepository.findOneBy({ id });
  }

  /**
   * Update Brand item by id
   * @param id
   * @param updateRefDto
   */
  async update(
    id: number,
    updateRefDto: UpdateRefDto,
  ): Promise<BrandEntity | null> {
    const res: UpdateResult = await this.refsRepository.update(
      { id },
      updateRefDto,
    );
    return res.affected
      ? this.refsRepository.create({ ...updateRefDto, id })
      : null;
  }

  /**
   * Remove Brand item by id
   * @param id
   */
  async remove(id: number): Promise<boolean> {
    const res: DeleteResult = await this.refsRepository.delete(id);
    return !!res.affected;
  }
}
