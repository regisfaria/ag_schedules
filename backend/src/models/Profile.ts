import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';

@Entity('profiles')
export default class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
