import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: true,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password: string;
}
