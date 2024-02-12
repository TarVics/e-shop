import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { AuthTokenKind } from '../enums';
import { AuthUser } from './auth-user.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

/**
 * JWT key information
 */
@Entity({ name: 'auth_tokens' })
export class AuthToken {
  /**
   * Primary key
   */
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => AuthUser, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_id' })
  @Index()
  user: AuthUser;

  /**
   * User reference
   */
  @ApiProperty()
  @Column()
  userId: number;

  @ApiHideProperty()
  @Exclude()
  @Column({ nullable: true })
  token: string;

  /**
   * User role
   */
  @ApiProperty()
  @Column({ type: 'enum', enum: AuthTokenKind, nullable: false })
  kind: AuthTokenKind;

  /**
   * JWT key expiration date
   */
  @ApiProperty()
  @Index()
  @Column({ nullable: false })
  expires: Date;

  @ApiHideProperty()
  @CreateDateColumn()
  @Index()
  @Exclude()
  createdAt: Date;

  @ApiHideProperty()
  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
