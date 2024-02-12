import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
  /**
   * Primary key
   */
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  @Index()
  @Exclude()
  public created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  public updated_at: Date;
}
