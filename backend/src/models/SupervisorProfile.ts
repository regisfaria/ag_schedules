import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('supervisor_profiles')
export default class SupervisorProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column()
  image: string;

  imageUrl: string;

  @Column()
  description: string;

  @Column()
  phoneNumber: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  street: string;

  @Column()
  addressNumber: string;

  @Column()
  cep: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
