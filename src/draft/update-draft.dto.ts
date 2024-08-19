import {IsOptional, IsString} from "class-validator";
import {PlayerStatus} from "../ranking/player-status.enum";

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

  @IsString()
  @IsOptional()
  totalParticipants: string;

  @IsOptional()
  playerStates: Record<string, PlayerStatus>;
}
