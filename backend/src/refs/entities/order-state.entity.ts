import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStateEnum } from '../enums';

/**
 * Order State information
 */
@Entity({ name: 'order_states' })
export class OrderStateEntity {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * State code
   */
  @ApiProperty()
  @Column({ unique: true, type: 'enum', enum: OrderStateEnum })
  code: OrderStateEnum;

  /**
   * State name (uk-UA)
   */
  @ApiProperty()
  @Column()
  name_uk: string;

  /**
   * State name (en-US)
   */
  @ApiProperty()
  @Column()
  name_en: string;

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
