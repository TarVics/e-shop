import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { ProductEntity } from './product.entity';

/**
 * Product image information
 */
@Entity({ name: 'product_images' })
export class ProductImageEntity {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Product
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => ProductEntity, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  /**
   * Product reference
   */
  @ApiHideProperty()
  @Exclude()
  @Column()
  productId: number;

  /**
   * Product main image
   */
  @ApiProperty()
  @Column()
  imageMain: string;

  /**
   * Product thumb image
   */
  @ApiProperty()
  @Column()
  imageThumb: string;

  /**
   * Create date
   */
  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Update date
   */
  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
