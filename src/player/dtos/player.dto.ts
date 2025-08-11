import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsObject,
} from 'class-validator';

export class RankingDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  ovr: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  rank: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  tier: string;
}

export class PlayerDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  id: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  pos: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  team: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  bye: string;

  @Expose()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => RankingDto)
  rankings: Record<string, RankingDto>;
}
