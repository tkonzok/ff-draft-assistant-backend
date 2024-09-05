import {IsArray, IsBoolean, IsInt, IsOptional, IsString} from "class-validator";

export class SleeperPlayerDto {
  @IsString()
  player_id: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  @IsOptional()
  search_first_name: string;

  @IsString()
  @IsOptional()
  search_last_name: string;

  @IsString()
  @IsOptional()
  search_full_name: string;

  @IsInt()
  @IsOptional()
  search_rank: number;

  @IsInt()
  @IsOptional()
  number: number;

  @IsString()
  @IsOptional()
  position: string;

  @IsOptional()
  depth_chart_position: number;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  team: string;

  @IsString()
  @IsOptional()
  college: string;

  @IsString()
  @IsOptional()
  birth_country: string;

  @IsInt()
  @IsOptional()
  years_exp: number;

  @IsArray()
  @IsOptional()
  fantasy_positions: string[];

  @IsOptional()
  @IsString()
  height: string;

  @IsOptional()
  @IsString()
  weight: string;

  @IsOptional()
  @IsString()
  injury_status: string;

  @IsInt()
  @IsOptional()
  age: number;

  @IsInt()
  @IsOptional()
  rotoworld_id: number;

  @IsOptional()
  @IsInt()
  yahoo_id: number;

  @IsInt()
  @IsOptional()
  fantasy_data_id: number;

  @IsOptional()
  @IsString()
  sportradar_id: string;

  @IsOptional()
  @IsInt()
  stats_id: number;

  @IsOptional()
  @IsInt()
  espn_id: number;
}
