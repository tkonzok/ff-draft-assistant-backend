import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PlayerStatus } from '../../player/player-status.enum';

export class UpdateDraftDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  settings: string;

  @IsString()
  @IsOptional()
  draftPosition: string;

  @IsOptional()
  @IsBoolean()
  thirdRoundReversal: boolean;

  @IsString()
  @IsOptional()
  totalParticipants: string;

  @IsOptional()
  playerStates: Record<string, PlayerStatus>;
}
