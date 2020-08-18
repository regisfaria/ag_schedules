import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import ScheduleAvailability from './ScheduleAvailability';

@Entity('holidays')
export default class Holiday {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ScheduleAvailability)
  @JoinColumn({ name: 'scheduleAvailabilityId' })
  scheduleAvailability: ScheduleAvailability;

  @Column()
  scheduleAvailabilityId: string;

  @Column('date')
  day: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
