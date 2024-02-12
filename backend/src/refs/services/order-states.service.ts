import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import { I18nLocale } from '../../core/enums';

import {
  CreateOrderStateDto,
  UpdateOrderStateDto,
  ViewOrderStateDto,
} from '../dto';
import { OrderStateEntity } from '../entities';
import { OrderStateEnum } from '../enums';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OrderStatesService {
  constructor(
    @InjectRepository(OrderStateEntity)
    private readonly refsRepository: Repository<OrderStateEntity>,
  ) {}

  /**
   * Create Order State item
   * @param createOrderStateDto
   */
  async create(
    createOrderStateDto: CreateOrderStateDto,
  ): Promise<OrderStateEntity> {
    const ref = await this.refsRepository.save(createOrderStateDto);
    return this.refsRepository.create(ref);
  }

  /**
   * Read all Order State items
   */
  findAll(): Promise<OrderStateEntity[]> {
    return this.refsRepository.find();
  }

  /**
   * Read all Order State items view
   * @constructor
   */
  async findAllView(locale: I18nLocale): Promise<ViewOrderStateDto> {
    const lang: string = locale.slice(0, 2);
    const selection: string[] = [
      't.id AS id',
      `t.name_${lang} AS name`,
      't.code AS code',
    ];
    const where: ObjectLiteral = {};

    const items = this.refsRepository
      .createQueryBuilder('t')
      .select(selection)
      .where(where)
      .getRawMany();

    return plainToInstance(ViewOrderStateDto, items, {
      enableImplicitConversion: true,
    });
  }

  /**
   * Read Order State item by id
   * @param id
   */
  findOne(id: number): Promise<OrderStateEntity | null> {
    return this.refsRepository.findOneBy({ id });
  }

  /**
   * Read Order State item by code
   * @param code
   */
  findOneByCode(code: OrderStateEnum): Promise<OrderStateEntity | null> {
    return this.refsRepository.findOneBy({ code });
  }

  /**
   * Update Order State item by id
   * @param id
   * @param updateOrderStateDto
   */
  async update(
    id: number,
    updateOrderStateDto: UpdateOrderStateDto,
  ): Promise<OrderStateEntity | null> {
    const res: UpdateResult = await this.refsRepository.update(
      { id },
      updateOrderStateDto,
    );
    return res.affected
      ? this.refsRepository.create({ ...updateOrderStateDto, id })
      : null;
  }

  /**
   * Remove Order State item by id
   * @param id
   */
  async remove(id: number): Promise<boolean> {
    const res: DeleteResult = await this.refsRepository.delete(id);
    return !!res.affected;
  }
}
