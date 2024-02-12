import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ShippingMethod } from '../enums';
import { ColumnNumericTransformer } from '../../core/validation';

/**
 * Shipping Method information
 */
@Entity({ name: 'shipping_methods' })
export class ShippingMethodEntity {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * User shipping method
   */
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ShippingMethod,
    nullable: false,
    default: ShippingMethod.Standard,
  })
  method: ShippingMethod;

  /**
   * User shipping price
   */
  @ApiProperty()
  @Column({
    type: 'numeric',
    precision: 13,
    scale: 4,
    transformer: new ColumnNumericTransformer(),
    nullable: false,
    default: 0,
  })
  readonly price: number;

  /**
   * Shipping method name (uk-UA)
   */
  @ApiProperty()
  @Column()
  name_uk: string;

  /**
   * Shipping method name (en-US)
   */
  @ApiProperty()
  @Column()
  name_en: string;

  /**
   * Shipping method short information (uk-UA)
   */
  @ApiProperty()
  @Column()
  info_uk: string;

  /**
   * Shipping method short information (en-US)
   */
  @ApiProperty()
  @Column()
  info_en: string;

  /**
   * Method is active
   */
  @ApiProperty()
  @Column({ default: false, nullable: false })
  active: boolean;

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
