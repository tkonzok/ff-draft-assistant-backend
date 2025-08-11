import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Player {
  @ObjectIdColumn()
  objectId: ObjectId;

  @Column({ type: 'varchar', length: 255 })
  id: string;

  @Column({ type: 'varchar', length: 50 })
  pos: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  team: string;

  @Column({ type: 'varchar', length: 50 })
  bye: string;

  @Column('json')
  rankings: Record<string, RankingDetails>;
}

export class RankingDetails {
  ovr: string;
  rank: string;
  tier: string;
}
