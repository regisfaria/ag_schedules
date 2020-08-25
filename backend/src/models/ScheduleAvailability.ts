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

@Entity('schedules_availability')
export default class ScheduleAvailability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'specialistId' })
  specialist: User;

  @Column()
  specialistId: string;

  @Column('int')
  day: number;

  @Column('int')
  openTime: number;

  formatedOpenHour: number;

  formatedOpenMinute: number;

  @Column('int')
  closeTime: number;

  formatedCloseHour: number;

  formatedCloseMinute: number;

  workDay: boolean;

  formatedDay: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
