import {IsNotEmpty, IsObject, IsOptional, IsString} from "class-validator";
import {PlayerStatus} from "../ranking/player-status.enum";

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
  draftPosition: string = "1";

  @IsNotEmpty()
  @IsString()
  totalParticipants: string;

  @IsNotEmpty()
  @IsObject()
  playerStates: Record<string, PlayerStatus>;
}
