import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { CollectionEntity } from './collection.entity';

/**
 * Category information
 */
@Entity({ name: 'categories' })
export class CategoryEntity {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Parent category
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => CategoryEntity, (category) => category.children)
  @JoinColumn({ name: 'parent_id' })
  parent?: CategoryEntity;

  /**
   * Parent category reference
   */
  @ApiProperty()
  @Column({ nullable: true })
  parentId: number;

  /**
   * Category name (uk-UA)
   */
  @ApiProperty()
  @Column()
  name_uk: string;

  /**
   * Category name (en-US)
   */
  @ApiProperty()
  @Column()
  name_en: string;

  /**
   * Child subcategories
   * @example []
   */
  @ApiHideProperty()
  @Exclude()
  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children: CategoryEntity[];

  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => CollectionEntity, { onDelete: 'RESTRICT', nullable: true })
  @JoinColumn({ name: 'collection_id' })
  collection?: CollectionEntity;

  /**
   * Collection reference
   */
  @ApiProperty()
  @Column({ nullable: true })
  collectionId?: number;

  /**
   * Banner image
   */
  @ApiProperty()
  @Column({ nullable: true })
  bannerImage?: string;

  /**
   * Banner description (uk-UA)
   */
  @ApiProperty()
  @Column({ nullable: true })
  bannerName_uk?: string;

  /**
   * Banner description (en-US)
   */
  @ApiProperty()
  @Column({ nullable: true })
  bannerName_en?: string;

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
