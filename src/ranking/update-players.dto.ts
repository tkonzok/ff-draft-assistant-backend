import { IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";
import { UpdatePlayerRankingDto } from "./update-player-ranking.dto";

export class UpdatePlayersDto {
  @IsString()
  @IsOptional()
  @Expose()
  id?: string;

  @IsString()
  @IsOptional()
  @Expose()
  pos: string;

  @IsString()
  @Expose()
  name: string;

  @IsString()
  @IsOptional()
  @Expose()
  team: string;

  @IsString()
  @IsOptional()
  @Expose()
  bye: string;

  @Expose()
  rankings: Record<string, UpdatePlayerRankingDto>;
}
