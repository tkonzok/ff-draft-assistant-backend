import { Expose, Type } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsOptional,
  IsObject,
} from "class-validator";
import {PlayerStatus} from "../../player/player-status.enum";

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
