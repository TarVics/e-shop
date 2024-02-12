import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

/**
 * Color information
 */
@Entity({ name: 'colors' })
export class ColorEntity {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Color name (uk-UA)
   */
  @ApiProperty()
  @Column()
  name_uk: string;

  /**
   * Color name (en-US)
   */
  @ApiProperty()
  @Column()
  name_en: string;

  /**
   * Hex color value
   * @example #FFF888
   */
  @ApiProperty()
  @Column({ length: 9 })
  color: string;

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
