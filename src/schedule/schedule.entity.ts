import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Schedule {
  @ObjectIdColumn()
  objectId: ObjectId;

  @Column()
  week: number;

  @Column()
  homeTeam: string;

  @Column()
  guestTeam: string;

  @Column()
  date: string;
}
