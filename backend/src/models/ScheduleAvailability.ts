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

  formatedOpenTime: string;

  @Column('int')
  closeTime: number;

  formatedCloseTime: string;

  workDay: boolean;

  mobileFormatedDay: string;

  desktopFormatedDay: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
