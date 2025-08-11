import { IsInt, IsString } from 'class-validator';

export class ScheduleDto {
  @IsInt()
  week: number;

  @IsString()
  homeTeam: string;

  @IsString()
  guestTeam: string;

  @IsString()
  date: string;
}
