import { Controller, Get, Body, Post, Query, Delete } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerDto } from './dtos/player.dto';
import { plainToInstance } from 'class-transformer';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { csvToJson } from '../utils/csv-to-json';
import { dataHppr1qb } from '../assets/rankings/data_hppr_1qb';
import { UpdateRankingDto } from './dtos/update-ranking.dto';
import { dataHpprSf } from '../assets/rankings/data_hppr_sf';
import { dataDynastySf } from '../assets/rankings/data_dynasty_sf';
import { SettingsDto } from './dtos/settings.dto';
import { dataBestballPpr1qb } from '../assets/rankings/data_bestball_ppr_1qb';

@Controller('players')
export class PlayerController {
  constructor(private readonly playersService: PlayerService) {}

  @Get()
  async getAll() {
    const players = await this.playersService.getAll();
    return plainToInstance(PlayerDto, players, {
      enableImplicitConversion: true,
    });
  }

  @Get('settings')
  async getSettings() {
    const settings = await this.playersService.getSettings();
    return plainToInstance(SettingsDto, settings);
  }

  @Post()
  async create(
    @Body() body: UpdatePlayerDto[],
    @Query('settings') settings: string,
  ) {
    const file = this.getFile(settings);
    if (!file) {
      return;
    }
    const plainData = csvToJson(file);
    const playersToUpdate = await this.createUpdatePlayerDtos(
      plainData,
      settings,
    );
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
      const rankingData: UpdateRankingDto = plainToInstance(UpdateRankingDto, {
        ovr: player.ovr,
        rank: player.rank,
        tier: player.tier,
      });

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
      case 'hppr1qb':
        return dataHppr1qb;
      case 'hpprSf':
        return dataHpprSf;
      case 'dynastySf':
        return dataDynastySf;
      // case "advanced1qb":
      //   return dataAdvanced1qb;
      // case "advanced1qbRecFlex":
      //   return dataAdvanced1qbRecFlex;
      // case "advancedSfRecFlex":
      //   return dataAdvancedSfRecFlex;
      case 'bestballPpr1qb':
        return dataBestballPpr1qb;
      // case "bestballAdvanced1qb":
      //   return dataBestballPpr1qb;
      default:
        return undefined;
    }
  }
}
