import { v4 as uuidV4 } from 'uuid';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { AuthUser } from '../../auth/entities';
import {
  OrderStateEntity,
  PaymentMethodEntity,
  ShippingMethodEntity,
} from '../../refs/entities';

import { CartEntity } from './cart.entity';

/**
 * Product review information
 */

@Entity({ name: 'orders' })
export class OrderEntity {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Order UID
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
   * Order user
   */
  @ApiHideProperty()
  @ManyToOne(() => AuthUser)
  @JoinColumn({ name: 'user_id' })
  user: AuthUser;

  /**
   * Order user reference
   */
  @ApiHideProperty()
  @Exclude()
  @Column()
  userId: number;

  /**
   * User zip code
   */
  @ApiProperty()
  @Column({ nullable: true, length: 10 })
  zipCode: string;

  /**
   * User country name
   */
  @ApiProperty()
  @Column({ nullable: true, length: 64 })
  country: string;

  /**
   * User city name
   */
  @ApiProperty()
  @Column({ nullable: true, length: 64 })
  city: string;

  /**
   * User address
   */
  @ApiProperty()
  @Column({ nullable: true })
  address: string;

  /**
   * Order Shipping Method
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => ShippingMethodEntity)
  @JoinColumn({ name: 'shipping_id' })
  shipping: ShippingMethodEntity;

  /**
   * Order Shipping Method reference
   */
  @ApiHideProperty()
  @Column({ default: 1 })
  shippingId: number;

  /**
   * Order Payment Method
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => PaymentMethodEntity)
  @JoinColumn({ name: 'payment_id' })
  payment: PaymentMethodEntity;

  /**
   * Order Payment Method reference
   */
  @ApiHideProperty()
  @Column({ default: 1 })
  paymentId: number;

  /**
   * Order Cart
   */
  @ApiHideProperty()
  @Exclude()
  @OneToOne(() => CartEntity, (cart) => cart.order)
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;

  /**
   * Order Cart reference
   */
  @ApiHideProperty()
  @Column()
  cartId: number;

  /**
   * Order State
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => OrderStateEntity)
  @JoinColumn({ name: 'state_id' })
  state: OrderStateEntity;

  /**
   * Order State reference
   */
  @ApiHideProperty()
  @Column({ default: 1 })
  stateId: number;

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
