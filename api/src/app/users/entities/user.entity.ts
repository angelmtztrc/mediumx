import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '/@/entities/base.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;
}
