import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import { CreateCurrencyDto, UpdateCurrencyDto } from '../dto';
import { CurrencyEntity } from '../entities';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(CurrencyEntity)
    private readonly refsRepository: Repository<CurrencyEntity>,
  ) {}

  /**
   * Create Currency item
   * @param createCurrencyDto
   */
  async create(createCurrencyDto: CreateCurrencyDto): Promise<CurrencyEntity> {
    const ref = await this.refsRepository.save(createCurrencyDto);
    return this.refsRepository.create(ref);
  }

  /**
   * Read all Currency items
   */
  findAll(): Promise<CurrencyEntity[]> {
    return this.refsRepository.find();
  }

  /**
   * Read Currency item by id
   * @param id
   */
  findOne(id: number): Promise<CurrencyEntity | null> {
    return this.refsRepository.findOneBy({ id });
  }

  /**
   * Update Currency item by id
   * @param id
   * @param updateCurrencyDto
   */
  async update(
    id: number,
    updateCurrencyDto: UpdateCurrencyDto,
  ): Promise<CurrencyEntity | null> {
    const res: UpdateResult = await this.refsRepository.update(
      { id },
      updateCurrencyDto,
    );
    return res.affected
      ? this.refsRepository.create({ ...updateCurrencyDto, id })
      : null;
  }

  /**
   * Remove Currency item by id
   * @param id
   */
  async remove(id: number): Promise<boolean> {
    const res: DeleteResult = await this.refsRepository.delete(id);
    return !!res.affected;
  }
}
