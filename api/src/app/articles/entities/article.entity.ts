import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '/@/entities/base.entity';

import { Category } from '/@/app/categories/entities/category.entity';
import { User } from '/@/app/users/entities/user.entity';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ length: 250 })
  description: string;

  @Column()
  content: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => User)
  @JoinTable()
  votes: User[];

  @ManyToOne(() => User)
  author: User;
}
