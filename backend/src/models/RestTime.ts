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

import ScheduleAvailability from './ScheduleAvailability';

@Entity('rest_times')
export default class RestTime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ScheduleAvailability)
  @JoinColumn({ name: 'scheduleAvailabilityId' })
  scheduleAvailability: ScheduleAvailability;

  @Column()
  scheduleAvailabilityId: string;

  @Column('int')
  startTime: number;

  @Column('int')
  endTime: number;

  formatedStartTime: string;

  formatedEndTime: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
