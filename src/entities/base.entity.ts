import {
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  Entity,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class BaseEntity {
  @ManyToOne((type) => Users)
  @JoinColumn({ name: 'lastModifiedId' })
  lastModifiedId: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  createdAt: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: string;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: string;
}
