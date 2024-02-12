import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import { CreateColorDto, UpdateColorDto } from '../dto';
import { ColorEntity } from '../entities';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly refsRepository: Repository<ColorEntity>,
  ) {}

  /**
   * Create Color item
   * @param createColorDto
   */
  async create(createColorDto: CreateColorDto): Promise<ColorEntity> {
    const ref = await this.refsRepository.save(createColorDto);
    return this.refsRepository.create(ref);
  }

  /**
   * Read all Color items
   */
  findAll(): Promise<ColorEntity[]> {
    return this.refsRepository.find();
  }

  /**
   * Read Color item by id
   * @param id
   */
  findOne(id: number): Promise<ColorEntity | null> {
    return this.refsRepository.findOneBy({ id });
  }

  /**
   * Update Color item by id
   * @param id
   * @param updateColorDto
   */
  async update(
    id: number,
    updateColorDto: UpdateColorDto,
  ): Promise<ColorEntity | null> {
    const res: UpdateResult = await this.refsRepository.update(
      { id },
      updateColorDto,
    );
    return res.affected
      ? this.refsRepository.create({ ...updateColorDto, id })
      : null;
  }

  /**
   * Remove Color item by id
   * @param id
   */
  async remove(id: number): Promise<boolean> {
    const res: DeleteResult = await this.refsRepository.delete(id);
    return !!res.affected;
  }
}
