import {SleeperPlayer} from "./sleeper-player.entity";
import {MongoRepository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import axios from "axios";
import {SleeperPlayerDto} from "./dtos/sleeper-player.dto";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";

@Injectable()
export class SleeperPlayersService {
  constructor(
    @InjectRepository(SleeperPlayer)
    private readonly sleeperPlayersRepository: MongoRepository<SleeperPlayer>,
  ) {}

  async updateAll() {
    await this.clearAll();
    const response = await axios.get("https://api.sleeper.app/v1/players/nfl");
    const sleeperPlayersData = response.data;
    if (!sleeperPlayersData) {
      return;
    }
    const playersToSave: SleeperPlayer[] = [];
    for (const [playerId, playerData] of Object.entries(sleeperPlayersData)) {
      const sleeperPlayerDto: SleeperPlayerDto = plainToInstance(SleeperPlayerDto, playerData)
      if (sleeperPlayerDto.active === false) {
        continue;
      }
      const validationErrors = await validate(sleeperPlayerDto);
      if (validationErrors.length > 0) {
        console.error(`Validation failed for player ${playerId}:`, validationErrors);
        continue;
      }
      sleeperPlayerDto.player_id = playerId;
      const sleeperPlayer: SleeperPlayer = {...sleeperPlayerDto} as SleeperPlayer
      playersToSave.push(sleeperPlayer);
    }

    await this.sleeperPlayersRepository.save(playersToSave);
    return playersToSave;
  }

  async getAll(): Promise<SleeperPlayer[]> {
    return this.sleeperPlayersRepository.find();
  }

  async clearAll(): Promise<void> {
    await this.sleeperPlayersRepository.delete({});
  }
}
