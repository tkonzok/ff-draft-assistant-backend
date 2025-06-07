import {MongoRepository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import axios from "axios";
import {plainToInstance} from "class-transformer";
import {ScheduleDto} from "./dtos/schedule.dto";
import {Schedule} from "./schedule.entity";

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: MongoRepository<Schedule>,
  ) {}

  async getAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find();
  }

  async clearAll(): Promise<void> {
    await this.scheduleRepository.delete({});
  }

  async uploadSchedule() {
    await this.clearAll();
    const response2025 = await axios.get("https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?limit=1000&dates=2025");
    const data2025: any[] = response2025.data.events;
    const response2026 = await axios.get("https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?limit=1000&dates=2026");
    const data2026: any[] = response2026.data.events;
    const seasonData = data2025.concat(data2026).filter((game) => game.season.year === 2025 && game.season.slug === "regular-season")
    const scheduleData: ScheduleDto[] = seasonData.map((game) => {
      const week = game.week.number;
      let teams = game.shortName.split(/[@]|VS/).map((team) => team.trim());
      teams = teams.map((team) => team === "WSH" ? "WAS" : team)
      return {
        week,
        guestTeam: teams[0],
        homeTeam: teams[1],
        date: game.date,
      };
    })
    scheduleData.map((game) => plainToInstance(ScheduleDto, game))
    return await this.scheduleRepository.save(scheduleData)
  }
}
