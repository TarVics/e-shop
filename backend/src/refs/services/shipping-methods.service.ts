import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import { CreateShippingMethodDto, UpdateShippingMethodDto } from '../dto';
import { ShippingMethodEntity } from '../entities';

@Injectable()
export class ShippingMethodsService {
  constructor(
    @InjectRepository(ShippingMethodEntity)
    private readonly refsRepository: Repository<ShippingMethodEntity>,
  ) {}

  /**
   * Create Shipping Method item
   * @param createShippingMethodDto
   */
  async create(
    createShippingMethodDto: CreateShippingMethodDto,
  ): Promise<ShippingMethodEntity> {
    const ref = await this.refsRepository.save(createShippingMethodDto);
    return this.refsRepository.create(ref);
  }

  /**
   * Read all Shipping Method items
   */
  findAll(): Promise<ShippingMethodEntity[]> {
    return this.refsRepository.find();
  }

  /**
   * Read Shipping Method item by id
   * @param id
   */
  findOne(id: number): Promise<ShippingMethodEntity | null> {
    return this.refsRepository.findOneBy({ id });
  }

  /**
   * Update Shipping Method item by id
   * @param id
   * @param updateShippingMethodDto
   */
  async update(
    id: number,
    updateShippingMethodDto: UpdateShippingMethodDto,
  ): Promise<ShippingMethodEntity | null> {
    const res: UpdateResult = await this.refsRepository.update(
      { id },
      updateShippingMethodDto,
    );
    return res.affected
      ? this.refsRepository.create({ ...updateShippingMethodDto, id })
      : null;
  }

  /**
   * Remove Shipping Method item by id
   * @param id
   */
  async remove(id: number): Promise<boolean> {
    const res: DeleteResult = await this.refsRepository.delete(id);
    return !!res.affected;
  }
}
