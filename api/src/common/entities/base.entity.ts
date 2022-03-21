import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @Column({ default: true })
  enabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ default: null, nullable: true })
  updatedAt?: Date;

  @Column({ default: null, nullable: true })
  deletedAt?: Date;
}
