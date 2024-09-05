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
    const response2024 = await axios.get("https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?limit=1000&dates=2024");
    const data2024: any[] = response2024.data.events;
    const response2025 = await axios.get("https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?limit=1000&dates=2025");
    const data2025: any[] = response2025.data.events;
    const seasonData = data2024.concat(data2025).filter((game) => game.season.year === 2024 && game.season.slug === "regular-season")
    const scheduleData: ScheduleDto[] = seasonData.map((game) => {
      const week = game.week.number;
      const teams = game.shortName.split(/[@]|VS/).map((team) => team.trim());
      return {
        week,
        guestTeam: teams[0],
        homeTeam: teams[1],
      };
    })
    scheduleData.map((game) => plainToInstance(ScheduleDto, game))
    return await this.scheduleRepository.save(scheduleData)
  }
}
