import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from '../dto';
import { PaymentMethodEntity } from '../entities';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethodEntity)
    private readonly refsRepository: Repository<PaymentMethodEntity>,
  ) {}

  /**
   * Create Payment Method item
   * @param createPaymentMethodDto
   */
  async create(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethodEntity> {
    const ref = await this.refsRepository.save(createPaymentMethodDto);
    return this.refsRepository.create(ref);
  }

  /**
   * Read all Payment Method items
   */
  findAll(): Promise<PaymentMethodEntity[]> {
    return this.refsRepository.find();
  }

  /**
   * Read Payment Method item by id
   * @param id
   */
  findOne(id: number): Promise<PaymentMethodEntity | null> {
    return this.refsRepository.findOneBy({ id });
  }

  /**
   * Update Payment Method item by id
   * @param id
   * @param updatePaymentMethodDto
   */
  async update(
    id: number,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethodEntity | null> {
    const res: UpdateResult = await this.refsRepository.update(
      { id },
      updatePaymentMethodDto,
    );
    return res.affected
      ? this.refsRepository.create({ ...updatePaymentMethodDto, id })
      : null;
  }

  /**
   * Remove Payment Method item by id
   * @param id
   */
  async remove(id: number): Promise<boolean> {
    const res: DeleteResult = await this.refsRepository.delete(id);
    return !!res.affected;
  }
}
