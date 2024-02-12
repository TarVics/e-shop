import {
  BeforeInsert,
  BeforeUpdate,
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

import { ProductEntity } from '../../refs/entities';
import { CartEntity } from './cart.entity';
import { ColumnNumericTransformer } from '../../core/validation';

/**
 * Cart item information
 */

@Entity({ name: 'cart_items' })
export class CartItemEntity {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Cart
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => CartEntity, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;

  /**
   * Cart reference
   */
  @ApiProperty()
  @Column()
  cartId: number;

  /**
   * Product
   */
  @ManyToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  /**
   * Product reference
   */
  @ApiHideProperty()
  @ApiProperty()
  @Exclude()
  @Column()
  productId: number;

  /**
   * Product price including the current date discount
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
   * Product quantity
   */
  @ApiProperty()
  @Column({ default: 0 })
  quantity: number;

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
  @BeforeUpdate()
  generatePrice() {
    this.price = this.product.finalPrice;
  }
}
