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

import SpecialistProfile from './SpecialistProfile';

@Entity('certificates')
export default class Certificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SpecialistProfile)
  @JoinColumn({ name: 'specialistProfileId' })
  specialistProfile: SpecialistProfile;

  @Column()
  specialistProfileId: string;

  @Column()
  certificate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
