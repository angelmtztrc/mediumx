import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '/@/entities/base.entity';

import { Article } from '/@/app/articles/entities/article.entity';
import { User } from '/@/app/users/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User)
  author: User;

  @Exclude()
  @ManyToOne(() => Article)
  article: Article;

  @Exclude()
  @ManyToOne(() => Comment, Comment => Comment.children, { nullable: true })
  parent?: Comment;

  @Exclude()
  @OneToMany(() => Comment, Comment => Comment.parent, { nullable: true })
  children?: Comment[];

  constructor(partial: Partial<Comment>) {
    super();
    Object.assign(this, partial);
  }
}
