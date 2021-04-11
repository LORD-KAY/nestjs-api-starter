import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @Column()
  @Generated('uuid')
  uuid: string;

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
