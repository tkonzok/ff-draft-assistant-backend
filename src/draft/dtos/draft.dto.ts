import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsObject } from 'class-validator';
import { PlayerStatus } from '../../player/player-status.enum';

export class DraftDto {
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
  @IsNotEmpty()
  @IsString()
  totalParticipants: string;

  @Expose()
  @IsObject()
  playerStates: Record<string, PlayerStatus>;
}
