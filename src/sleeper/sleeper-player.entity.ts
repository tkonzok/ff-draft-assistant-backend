import {Entity, Column, ObjectIdColumn} from "typeorm";
import {ObjectId} from "mongodb";

@Entity()
export class SleeperPlayer {
  @ObjectIdColumn()
  objectId: ObjectId;

  @Column()
  player_id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  active: boolean;

  @Column({ nullable: true })
  search_first_name: string;

  @Column({ nullable: true })
  search_last_name: string;

  @Column({ nullable: true })
  search_full_name: string;

  @Column({ nullable: true })
  search_rank: number;

  @Column({ nullable: true })
  number: number;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true })
  depth_chart_position: number;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  team: string;

  @Column({ nullable: true })
  college: string;

  @Column({ nullable: true })
  birth_country: string;

  @Column({ nullable: true })
  years_exp: number;

  @Column("simple-array")
  fantasy_positions: string[];

  @Column({ nullable: true })
  height: string;

  @Column({ nullable: true })
  weight: string;

  @Column({ nullable: true })
  injury_status: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  rotoworld_id: number;

  @Column({ nullable: true })
  yahoo_id: number;

  @Column({ nullable: true })
  fantasy_data_id: number;

  @Column({ nullable: true })
  sportradar_id: string;

  @Column({ nullable: true })
  stats_id: number;

  @Column({ nullable: true })
  espn_id: number;
}
