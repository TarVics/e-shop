import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

import { CreateProductImageDto } from '../dto';
import { ProductImageEntity } from '../entities';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImageEntity)
    private readonly productImageRepository: Repository<ProductImageEntity>,
  ) {}

  /**
   * Create Product image item
   * @param createProductImageDto
   */
  async create(
    createProductImageDto: CreateProductImageDto,
  ): Promise<ProductImageEntity> {
    const res = await this.productImageRepository.save(createProductImageDto);
    return this.productImageRepository.create(res);
  }

  /**
   * Read Product image by id
   * @param id
   * @param productId
   */
  findOne(id: number, productId: number): Promise<ProductImageEntity | null> {
    return this.productImageRepository.findOneBy({ id, productId });
  }

  /**
   * Remove Product image by id
   * @param id
   */
  async remove(id: number): Promise<boolean> {
    const res: DeleteResult = await this.productImageRepository.delete(id);
    return !!res.affected;
  }
}
