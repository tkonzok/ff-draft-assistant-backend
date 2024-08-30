import {
  Controller,
  Get,
  Body,
  Post,
  Query,
  Delete,
} from "@nestjs/common";
import { PlayerService } from "./player.service";
import { PlayerDto } from "./dtos/player.dto";
import { plainToInstance } from "class-transformer";
import { UpdatePlayerDto } from "./dtos/update-player.dto";
import { csvToJson } from "../utils/csv-to-json";
import { dataHppr1qb } from "../assets/rankings/data_hppr_1qb";
import { UpdateRankingDto } from "./dtos/update-ranking.dto";
import { dataHpprSf } from "../assets/rankings/data_hppr_sf";
import { dataUpsidebowl1qb } from "../assets/rankings/data_upsidebowl_1qb";
import { dataPpr1qb } from "../assets/rankings/data_ppr_1qb";
import {dataArcadebowl} from "../assets/rankings/data_arcadebowl";
import {dataWk1Ppr} from "../assets/rankings/data_wk1_ppr";

@Controller("players")
export class PlayerController {
  constructor(private readonly playersService: PlayerService) {}

  @Get()
  async getAll() {
    const players = await this.playersService.getAll();
    return plainToInstance(PlayerDto, players, {
      enableImplicitConversion: true,
    });
  }

  @Post()
  async create(
    @Body() body: UpdatePlayerDto[],
    @Query("settings") settings: string,
  ) {
    const file = this.getFile(settings);
    if (!file) {
      return;
    }
    const plainData = csvToJson(file);
    const playersToUpdate = await this.createUpdatePlayerDtos(plainData, settings);
    return this.playersService.create(playersToUpdate);
  }

  @Delete()
  async delete() {
    await this.playersService.clearAll();
  }

  private async createUpdatePlayerDtos(
    data: any[],
    settings: string,
  ): Promise<UpdatePlayerDto[]> {
    return data.map((player) => {
      const rankingData: UpdateRankingDto = plainToInstance(
        UpdateRankingDto,
        {
          ovr: player.ovr,
          rank: player.rank,
          tier: player.tier,
        },
      );

      return plainToInstance(UpdatePlayerDto, {
        id: player.id,
        name: player.name,
        ...(player.pos && { pos: player.pos }),
        ...(player.team && { team: player.team }),
        ...(player.bye && { bye: player.bye }),
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
      case "wk1ppr":
        return dataWk1Ppr;
      default:
        return undefined;
    }
  }
}
