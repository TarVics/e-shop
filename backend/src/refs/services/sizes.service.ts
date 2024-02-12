import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import { CreateRefDto, UpdateRefDto } from '../dto';
import { SizeEntity } from '../entities';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(SizeEntity)
    private readonly refsRepository: Repository<SizeEntity>,
  ) {}

  /**
   * Create Size item
   * @param createRefDto
   */
  async create(createRefDto: CreateRefDto): Promise<SizeEntity> {
    const ref = await this.refsRepository.save(createRefDto);
    return this.refsRepository.create(ref);
  }

  /**
   * Read all Size items
   */
  findAll(): Promise<SizeEntity[]> {
    return this.refsRepository.find();
  }

  /**
   * Read Size item by id
   * @param id
   */
  findOne(id: number): Promise<SizeEntity | null> {
    return this.refsRepository.findOneBy({ id });
  }

  /**
   * Update Size item by id
   * @param id
   * @param updateRefDto
   */
  async update(
    id: number,
    updateRefDto: UpdateRefDto,
  ): Promise<SizeEntity | null> {
    const res: UpdateResult = await this.refsRepository.update(
      { id },
      updateRefDto,
    );
    return res.affected
      ? this.refsRepository.create({ ...updateRefDto, id })
      : null;
  }

  /**
   * Remove Size item by id
   * @param id
   */
  async remove(id: number): Promise<boolean> {
    const res: DeleteResult = await this.refsRepository.delete(id);
    return !!res.affected;
  }
}
