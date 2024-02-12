import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

/**
 * Brand information
 */
@Entity({ name: 'brands' })
export class BrandEntity {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Brand name (uk-UA)
   */
  @ApiProperty()
  @Column()
  name_uk: string;

  /**
   * Brand name (en-US)
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
