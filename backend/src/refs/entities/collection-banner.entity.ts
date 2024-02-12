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

import { BannerKind } from '../enums';
import { CollectionEntity } from './collection.entity';

/**
 * Collection banners information
 */
@Entity({ name: 'collection_banners' })
export class CollectionBannerEntity {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Collection
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => CollectionEntity, (collection) => collection.banners)
  @JoinColumn({ name: 'collection_id' })
  collection: CollectionEntity;

  /**
   * Collection reference
   */
  @ApiHideProperty()
  @Exclude()
  @Column()
  collectionId: number;

  /**
   * Banner image
   */
  @ApiProperty()
  @Column()
  banner: string;

  /**
   * Banner image kind
   */
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: BannerKind,
    nullable: false,
  })
  kind: BannerKind;

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
