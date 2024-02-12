import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import { CreateRefDto, UpdateRefDto } from '../dto';
import { ModelEntity } from '../entities';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(ModelEntity)
    private readonly refsRepository: Repository<ModelEntity>,
  ) {}

  /**
   * Create Model item
   * @param createRefDto
   */
  async create(createRefDto: CreateRefDto): Promise<ModelEntity> {
    const ref = await this.refsRepository.save(createRefDto);
    return this.refsRepository.create(ref);
  }

  /**
   * Read all Model items
   */
  findAll(): Promise<ModelEntity[]> {
    return this.refsRepository.find();
  }

  /**
   * Read Model item by id
   * @param id
   */
  findOne(id: number): Promise<ModelEntity | null> {
    return this.refsRepository.findOneBy({ id });
  }

  /**
   * Update Model item by id
   * @param id
   * @param updateRefDto
   */
  async update(
    id: number,
    updateRefDto: UpdateRefDto,
  ): Promise<ModelEntity | null> {
    const res: UpdateResult = await this.refsRepository.update(
      { id },
      updateRefDto,
    );
    return res.affected
      ? this.refsRepository.create({ ...updateRefDto, id })
      : null;
  }

  /**
   * Remove Model item by id
   * @param id
   */
  async remove(id: number): Promise<boolean> {
    const res: DeleteResult = await this.refsRepository.delete(id);
    return !!res.affected;
  }
}
