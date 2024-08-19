import {Column, Entity, ObjectIdColumn} from "typeorm";
import {ObjectId} from "mongodb";
import {PlayerStatus} from "../ranking/player-status.enum";

@Entity()
export class Draft {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  settings: string;

  @Column()
  draftPosition: string;

  @Column()
  totalParticipants: string;

  @Column()
  playerStates: Record<string, PlayerStatus>;
}
