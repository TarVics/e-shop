import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { CollectionBannerEntity } from './collection-banner.entity';

/**
 * Collection information
 */
@Entity({ name: 'collections' })
export class CollectionEntity {
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
   * Reference item description (uk-UA)
   */
  @ApiProperty()
  @Column({ nullable: true })
  description_uk?: string;

  /**
   * Reference item description (en-US)
   */
  @ApiProperty()
  @Column({ nullable: true })
  description_en?: string;

  /**
   * Is hot collection mark
   */
  @ApiProperty()
  @Column({ default: false })
  isHot: boolean;

  /**
   * Collection banners
   * @example []
   */
  @ApiProperty({ type: () => CollectionBannerEntity, isArray: true })
  @OneToMany(() => CollectionBannerEntity, (banner) => banner.collection, {
    eager: true,
  })
  banners: CollectionBannerEntity[];

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
