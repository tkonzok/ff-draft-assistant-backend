import { Expose } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsObject,
  IsBoolean,
} from 'class-validator';
import { PlayerStatus } from '../../player/player-status.enum';

export class DraftDto {
  // ...existing fields...
  @Expose()
  @IsNotEmpty()
  @IsString()
  id: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  settings: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  draftPosition: string;

  @Expose()
  @IsBoolean()
  thirdRoundReversal: boolean;

  @Expose()
  @IsNotEmpty()
  @IsString()
  totalParticipants: string;

  @Expose()
  @IsArray()
  pickPositions: string[];

  @Expose()
  @IsObject()
  playerStates: Record<string, PlayerStatus>;
}
