import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { PlayerStatus } from '../../player/player-status.enum';

export class CreateDraftDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  settings: string;

  @IsNotEmpty()
  @IsString()
  draftPosition: string = '1';

  @IsOptional()
  @IsBoolean()
  thirdRoundReversal: boolean = false;

  @IsNotEmpty()
  @IsString()
  totalParticipants: string;

  @IsOptional()
  @IsArray()
  pickPositions: string[] = [];

  @IsNotEmpty()
  @IsObject()
  playerStates: Record<string, PlayerStatus>;
}
