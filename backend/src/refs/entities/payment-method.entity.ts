import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { PaymentMethod } from '../enums';

/**
 * Payment Method information
 */
@Entity({ name: 'payment_methods' })
export class PaymentMethodEntity {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * User payment method
   */
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: false,
    default: PaymentMethod.BankTransfer,
  })
  method: PaymentMethod;

  /**
   * Payment method name (uk-UA)
   */
  @ApiProperty()
  @Column()
  name_uk: string;

  /**
   * Payment method name (en-US)
   */
  @ApiProperty()
  @Column()
  name_en: string;

  /**
   * Payment method short information (uk-UA)
   */
  @ApiProperty()
  @Column()
  info_uk: string;

  /**
   * Payment method short information (en-US)
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
