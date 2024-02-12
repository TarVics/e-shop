import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Gender information
 */
@Entity({ name: 'genders' })
export class GenderEntity {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Gender name (uk-UA)
   */
  @ApiProperty()
  @Column()
  name_uk: string;

  /**
   * Gender name (en-US)
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
