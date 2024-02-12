import { v4 as uuidV4 } from 'uuid';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { ColumnNumericTransformer } from '../../core/validation';

import { AuthUser } from '../../auth/entities';
import { ProductEntity } from '../../refs/entities';

/**
 * Product review information
 */

@Entity({ name: 'reviews' })
export class ReviewEntity {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Review UID
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
   * Reviewing product
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  /**
   * Product reference
   */
  @ApiHideProperty()
  @Exclude()
  @Column()
  productId: number;

  /**
   * Product review user
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => AuthUser)
  @JoinColumn({ name: 'user_id' })
  user: AuthUser;

  /**
   * Product review user reference
   */
  @ApiHideProperty()
  @Exclude()
  @Column()
  userId: number;

  /**
   * User name
   */
  @ApiProperty()
  @Column()
  author: string;

  /**
   * User email
   */
  @ApiProperty()
  @Column({ length: 128 })
  email: string;

  /**
   * Product review contents
   */
  @ApiProperty()
  @Column({ type: 'text' })
  text: string;

  /**
   * Product rating
   */
  @ApiProperty()
  @Column({
    type: 'numeric',
    precision: 4,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  rating: number;

  /**
   * Create Date
   */
  @ApiProperty()
  @CreateDateColumn()
  @Index()
  createdAt: Date;

  /**
   * Update Date
   */
  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generateUUID() {
    this.uid = uuidV4().replace(/-/g, '');
  }
}
