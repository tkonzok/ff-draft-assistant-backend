import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  Patch,
  Post,
  Query,
  Delete,
} from "@nestjs/common";
import { RankingService } from "./ranking.service";
import { PlayerDto } from "./player.dto";
import { plainToInstance } from "class-transformer";
import { UpdatePlayersDto } from "./update-players.dto";
import { csvToJson } from "../utils/csv-to-json";
import { dataHppr1qb } from "../assets/rankings/data_hppr_1qb";
import { UpdatePlayerRankingDto } from "./update-player-ranking.dto";
import { dataHpprSf } from "../assets/rankings/data_hppr_sf";
import { dataUpsidebowl1qb } from "../assets/rankings/data_upsidebowl_1qb";
import { dataPpr1qb } from "../assets/rankings/data_ppr_1qb";
import {dataArcadebowl} from "../assets/rankings/data_arcadebowl";

@Controller("players")
export class RankingController {
  constructor(private readonly playersService: RankingService) {}

  @Get()
  async getPlayers() {
    const players = await this.playersService.getPlayers();
    return plainToInstance(PlayerDto, players, {
      enableImplicitConversion: true,
    });
  }

  @Post()
  async create(
    @Body() body: UpdatePlayersDto[],
    @Query("settings") settings: string,
  ) {
    const file = this.getFile(settings);
    if (!file) {
      return;
    }
    const plainData = csvToJson(file);
    const updateData = await this.createOrUpdatePlayer(plainData, settings);
    return this.playersService.create(updateData);
  }

  @Patch()
  async update(
    @Body() body: UpdatePlayersDto[],
    @Query("settings") settings: string,
  ) {
    const file = this.getFile(settings);
    if (!file) {
      return;
    }
    const plainData = csvToJson(file);
    const updateData = await this.createOrUpdatePlayer(plainData, settings);
    return this.playersService.update(updateData);
  }

  @Delete()
  async delete() {
    await this.playersService.clearPlayers();
  }

  private async createOrUpdatePlayer(
    data: any[],
    settings: string,
  ): Promise<UpdatePlayersDto[]> {
    return data.map((player) => {
      const rankingData: UpdatePlayerRankingDto = plainToInstance(
        UpdatePlayerRankingDto,
        {
          ovr: player.ovr,
          rank: player.rank,
          tier: player.tier,
        },
      );

      return plainToInstance(UpdatePlayersDto, {
        id: player.id,
        name: player.name,
        pos: player.pos,
        team: player.team,
        bye: player.bye,
        rankings: {
          [settings]: rankingData,
        },
      });
    });
  }

  private getFile(settings: string) {
    switch (settings) {
      case "hppr1qb":
        return dataHppr1qb;
      case "hpprSf":
        return dataHpprSf;
      case "ppr1qb":
        return dataPpr1qb;
      case "upsidebowl1qb":
        return dataUpsidebowl1qb;
      case "arcadebowl":
        return dataArcadebowl;
      default:
        return undefined;
    }
  }
}
