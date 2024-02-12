import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ColumnNumericTransformer } from '../../core/validation';

/**
 * Currency information
 */
@Entity({ name: 'currencies' })
export class CurrencyEntity {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Currency name
   * @example UAH
   */
  @ApiProperty()
  @Column({ length: 3 })
  name: string;

  /**
   * Currency sign
   * @example $
   */
  @ApiProperty()
  @Column({ length: 1 })
  sign: string;

  /**
   * Tail currency description (uk-UA)
   * @example грн
   */
  @ApiProperty()
  @Column({ length: 3, nullable: true })
  tail_uk?: string;

  /**
   * Tail currency description (en-US)
   */
  @ApiProperty()
  @Column({ length: 3, nullable: true })
  tail_en?: string;

  /**
   * Currency exchange rate
   * @example 1.35
   */
  @ApiProperty()
  @Column({
    type: 'numeric',
    precision: 13,
    scale: 4,
    transformer: new ColumnNumericTransformer(),
  })
  rate: number;

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
