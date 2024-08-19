import { IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";
import { UpdatePlayerRankingDto } from "./update-player-ranking.dto";

export class UpdatePlayersDto {
  @IsString()
  @IsOptional()
  @Expose()
  id?: string;

  @IsString()
  @Expose()
  pos: string;

  @IsString()
  @Expose()
  name: string;

  @IsString()
  @Expose()
  team: string;

  @IsString()
  @Expose()
  bye: string;

  @Expose()
  rankings: Record<string, UpdatePlayerRankingDto>;
}
