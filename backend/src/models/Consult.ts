import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';
import Pacient from './Pacient';

@Entity('consults')
export default class Consult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdById' })
  user: User;

  @Column()
  createdById: string;

  createdBy: string | undefined;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'specialistId' })
  specialist: User;

  @Column()
  specialistId: string;

  specialistName: string | undefined;

  specialistImgUrl: string;

  @ManyToOne(() => Pacient)
  @JoinColumn({ name: 'pacientId' })
  pacient: Pacient;

  @Column()
  pacientId: string;

  pacientName: string | undefined;

  @Column('date')
  date: Date;

  @Column('int')
  hour: number;

  formatedHour: string;

  formatedEndHour: string;

  @Column()
  payment: string;

  @Column()
  status: string;

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
