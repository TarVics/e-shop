import { v4 as uuidV4 } from 'uuid';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import { CartItemEntity } from './cart-item.entity';
import { Exclude } from 'class-transformer';
import { OrderEntity } from './order.entity';
import { ColumnNumericTransformer } from '../../core/validation';

/**
 * Cart information
 */

@Entity({ name: 'carts' })
export class CartEntity {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Cart UID
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
   * Cart
   */
  @ApiHideProperty()
  @Exclude()
  @OneToOne(() => OrderEntity, (order) => order.cart)
  order: OrderEntity;

  /**
   * Cart total price
   */
  @ApiProperty()
  @Column({
    type: 'numeric',
    precision: 13,
    scale: 4,
    transformer: new ColumnNumericTransformer(),
  })
  total: number;

  /**
   * Cart items
   */
  @OneToMany(() => CartItemEntity, (item) => item.cart, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  items: CartItemEntity[];

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
    if (!this.uid) this.uid = uuidV4().replace(/-/g, '');
  }

  @BeforeInsert()
  @BeforeUpdate()
  generateTotal() {
    this.total = this.items.reduce(
      (total, item) => (total += item.product.finalPrice * item.quantity),
      0,
    );
  }
}
