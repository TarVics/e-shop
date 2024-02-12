import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Size information
 */
@Entity({ name: 'sizes' })
export class SizeEntity {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Size name (uk-UA)
   */
  @ApiProperty()
  @Column()
  name_uk: string;

  /**
   * Size name (en-US)
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
