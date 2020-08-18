import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  type: string;

  @Column('boolean')
  active: boolean;

  @DeleteDateColumn()
  deletedAt: Date;
}
