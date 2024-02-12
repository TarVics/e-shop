import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { AuthRole } from '../enums';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

/**
 * User information
 */
@Entity({ name: 'auth_users' })
export class AuthUser {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * User first name
   */
  @ApiProperty()
  @Column({ type: 'varchar', length: 32, nullable: true })
  firstName: string | null;

  /**
   * User last name
   */
  @ApiProperty()
  @Column({ type: 'varchar', length: 32, nullable: true })
  lastName: string | null;

  /**
   * User name
   */
  // @ApiProperty()
  // @Expose({ name: "name"  })
  get fullName(): string {
    return this.firstName && this.lastName
      ? `${this.firstName} ${this.lastName}`
      : this.firstName
      ? this.firstName
      : this.lastName || '';
  }

  /**
   * User email
   */
  @ApiProperty()
  @Column({ length: 128, nullable: false, unique: true })
  email: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ length: 128, nullable: false })
  password: string;

  /**
   * User role
   */
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: AuthRole,
    nullable: false,
    default: AuthRole.User,
  })
  role: AuthRole;

  @ApiHideProperty()
  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  refreshToken: string | null;

  /**
   * User activity status
   */
  @ApiProperty()
  @Column({ name: 'is_active', nullable: false, default: false })
  active: boolean;

  @ApiHideProperty()
  @Exclude()
  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @ApiHideProperty()
  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
