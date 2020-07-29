import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  privileges: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
