import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { AuthUser } from '../../auth/entities';
import { PaymentMethodEntity, ShippingMethodEntity } from '../../refs/entities';

/**
 * User profile information
 */
@Entity({ name: 'profiles' })
export class ProfileEntity {
  /**
   * Primary key
   */
  @ApiProperty()
  @Exclude()
  @PrimaryColumn()
  id: number;

  /**
   * Authenticated user
   */
  @ApiHideProperty()
  @Exclude()
  @OneToOne(() => AuthUser, { eager: true })
  @JoinColumn({ name: 'id' })
  user: AuthUser;

  /**
   * User first name
   */
  @ApiProperty()
  @IsOptional()
  firstName: string | null;

  /**
   * User last name
   */
  @ApiProperty()
  @IsOptional()
  lastName: string | null;

  /**
   * User email
   */
  @ApiProperty()
  @IsOptional()
  email: string;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  assignUser(user?: AuthUser) {
    if (user) this.user = user;
    this.id = this.user?.id;
    this.email = this.user?.email;
    this.firstName = this.user?.firstName;
    this.lastName = this.user?.lastName;
  }

  get fullName(): string {
    return this.firstName && this.lastName
      ? `${this.firstName} ${this.lastName}`
      : this.firstName
      ? this.firstName
      : this.lastName || '';
  }

  /**
   * User address
   */
  @ApiProperty()
  @IsOptional()
  @Column({ length: 255, nullable: true })
  address: string;

  /**
   * User city
   */
  @ApiProperty()
  @IsOptional()
  @Column({ length: 32, nullable: true })
  city: string;

  /**
   * User zip code
   */
  @ApiProperty()
  @IsOptional()
  @Column({ length: 16, nullable: true })
  zipCode: string;

  /**
   * User phone number
   */
  @ApiProperty()
  @IsOptional()
  @Column({ length: 32, nullable: true })
  tel: string;

  /**
   * User country name
   */
  @ApiProperty()
  @IsOptional()
  @Column({ length: 32, nullable: true })
  country: string;

  /**
   * User payment method
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => PaymentMethodEntity, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod: PaymentMethodEntity;

  /**
   * User payment method reference
   */
  @ApiProperty()
  @Column()
  paymentMethodId: number;

  /**
   * User shipping method
   */
  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => ShippingMethodEntity, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'shipping_method_id' })
  shippingMethod: ShippingMethodEntity;

  /**
   * User shipping method reference
   */
  @ApiProperty()
  @Column()
  shippingMethodId: number;

  @ApiHideProperty()
  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @ApiHideProperty()
  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
