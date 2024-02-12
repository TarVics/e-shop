import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Optional } from '@nestjs/common';

import { ColumnNumericTransformer } from '../../core/validation';

import {
  BrandEntity,
  CategoryEntity,
  CollectionEntity,
  ColorEntity,
  GenderEntity,
  ModelEntity,
  SizeEntity,
} from './index';
import { ProductImageEntity } from './product-image.entity';

/**
 * Product information
 */

@Entity({ name: 'products' })
@Index(['name_uk', 'brief_uk', 'description_uk', 'details_uk'], {
  fulltext: true,
})
@Index(['name_en', 'brief_en', 'description_en', 'details_en'], {
  fulltext: true,
})
export class ProductEntity {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Item UID
   */
  @ApiProperty()
  @Column({
    unique: true,
    length: 32,
    // default:
    //   "LOWER(CONCAT(\n" +
    //   "  HEX(RANDOM_BYTES(4)),\n" +
    //   "  HEX(RANDOM_BYTES(2)),\n" +
    //   "  '4', SUBSTR(HEX(RANDOM_BYTES(2)), 2, 3),\n" +
    //   "  HEX(FLOOR(ASCII(RANDOM_BYTES(1)) / 64) + 8), SUBSTR(HEX(RANDOM_BYTES(2)), 2, 3),\n" +
    //   "  HEX(RANDOM_BYTES(6))\n" +
    //   "))"
  })
  uid: string;

  /**
   * Product name (uk-UA)
   */
  @ApiProperty()
  @Column()
  name_uk: string;

  /**
   * Product name (en-US)
   */
  @ApiProperty()
  @Column()
  name_en: string;

  /**
   * Product color
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => ColorEntity)
  @JoinColumn({ name: 'color_id' })
  color?: ColorEntity;

  /**
   * Product color reference
   */
  @ApiProperty()
  @Column({ nullable: true })
  colorId: number;

  /**
   * Product size
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => SizeEntity)
  @JoinColumn({ name: 'size_id' })
  size?: SizeEntity;

  /**
   * Product size reference
   */
  @ApiProperty()
  @Column({ nullable: true })
  sizeId: number;

  /**
   * Product quantity
   */
  @ApiProperty()
  @Column({ default: 0 })
  quantity: number;

  /**
   * Product category
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  /**
   * Product category reference
   */
  @ApiProperty()
  @Column()
  categoryId: number;

  /**
   * Product model
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => ModelEntity)
  @JoinColumn({ name: 'model_id' })
  model?: ModelEntity;

  /**
   * Product model reference
   */
  @ApiProperty()
  @Column({ nullable: true })
  modelId: number;

  /**
   * Product collection
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => CollectionEntity)
  @JoinColumn({ name: 'collection_id' })
  collection?: CollectionEntity;

  /**
   * Product collection reference
   */
  @ApiProperty()
  @Column({ nullable: true })
  collectionId: number;

  /**
   * Product brand
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => BrandEntity)
  @JoinColumn({ name: 'brand_id' })
  brand: BrandEntity;

  /**
   * Product collection reference
   */
  @ApiProperty()
  @Column()
  brandId: number;

  /**
   * Product gender
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => GenderEntity)
  @JoinColumn({ name: 'gender_id' })
  gender?: GenderEntity;

  /**
   * Product gender reference
   */
  @ApiProperty()
  @Column({ nullable: true })
  genderId: number;

  /**
   * Product price
   */
  @ApiProperty()
  @Column({
    type: 'numeric',
    precision: 13,
    scale: 4,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  /**
   * Product sale
   */
  @ApiProperty()
  @Optional()
  @Column({
    nullable: true,
    type: 'numeric',
    precision: 5,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  sale?: number;

  /**
   * Product sale stop date
   */
  @ApiProperty()
  @Optional()
  @Column({ nullable: true })
  saleStop?: Date;

  /**
   * Product rating
   */
  @ApiProperty()
  @Optional()
  @Column({
    nullable: true,
    type: 'numeric',
    precision: 4,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  rating?: number;

  /**
   * Product new status
   */
  @ApiProperty()
  @Column()
  isNew: boolean;

  /**
   * Product brief information (uk-UA)
   */
  @ApiProperty()
  @Column({ type: 'text' })
  brief_uk: string;

  /**
   * Product brief information (en-US)
   */
  @ApiProperty()
  @Column({ type: 'text' })
  brief_en: string;

  /**
   * Product description (uk-UA)
   */
  @ApiProperty()
  @Column({ type: 'text' })
  description_uk: string;

  /**
   * Product description (en-US)
   */
  @ApiProperty()
  @Column({ type: 'text' })
  description_en: string;

  /**
   * Product details (uk-UA)
   */
  @ApiProperty()
  @Column({ type: 'text' })
  details_uk: string;

  /**
   * Product details (en-US)
   */
  @ApiProperty()
  @Column({ type: 'text' })
  details_en: string;

  /**
   * Product column image
   */
  @ApiProperty()
  @Column({ nullable: true })
  imageColumn: string;

  /**
   * Product images
   */
  @OneToMany(() => ProductImageEntity, (image) => image.product)
  images: ProductImageEntity[];

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

  get saleOffTime(): number {
    if (!this.saleStop || !this.sale) return 0;

    const countDownDate = new Date(this.saleStop).getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;

    return distance < 0 ? 0 : distance;
  }

  get hasSale(): boolean {
    return !!(this.sale && (!this.saleStop || this.saleOffTime));
  }

  get finalPrice(): number {
    return this.sale && this.hasSale
      ? this.price - (this.price * this.sale) / 100
      : this.price;
  }
}
