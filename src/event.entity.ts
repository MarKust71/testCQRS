import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  className: string;

  @Column('json')
  payload: any;

  @Column()
  aggregateId: string;

  @CreateDateColumn()
  createdAt: Date;
}
