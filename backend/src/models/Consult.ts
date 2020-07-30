import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';
import Pacient from './Pacient';

@Entity('consults')
export default class Consult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  createdBy: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'specialistId' })
  specialist: User;

  @Column()
  specialistId: string;

  @ManyToOne(() => Pacient)
  @JoinColumn({ name: 'pacientId' })
  pacient: User;

  @Column()
  pacientId: string;

  @Column('date')
  date: Date;

  @Column('int')
  hour: number;

  formatedHour: string;

  @Column()
  payment: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
