import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import { CreateRefDto, UpdateRefDto } from '../dto';
import { GenderEntity } from '../entities';

@Injectable()
export class GendersService {
  constructor(
    @InjectRepository(GenderEntity)
    private readonly refsRepository: Repository<GenderEntity>,
  ) {}

  /**
   * Create Gender item
   * @param createRefDto
   */
  async create(createRefDto: CreateRefDto): Promise<GenderEntity> {
    const ref = await this.refsRepository.save(createRefDto);
    return this.refsRepository.create(ref);
  }

  /**
   * Read all Gender items
   */
  findAll(): Promise<GenderEntity[]> {
    return this.refsRepository.find();
  }

  /**
   * Read Gender item by id
   * @param id
   */
  findOne(id: number): Promise<GenderEntity | null> {
    return this.refsRepository.findOneBy({ id });
  }

  /**
   * Update Gender item by id
   * @param id
   * @param updateRefDto
   */
  async update(
    id: number,
    updateRefDto: UpdateRefDto,
  ): Promise<GenderEntity | null> {
    const res: UpdateResult = await this.refsRepository.update(
      { id },
      updateRefDto,
    );
    return res.affected
      ? this.refsRepository.create({ ...updateRefDto, id })
      : null;
  }

  /**
   * Remove Gender item by id
   * @param id
   */
  async remove(id: number): Promise<boolean> {
    const res: DeleteResult = await this.refsRepository.delete(id);
    return !!res.affected;
  }
}
