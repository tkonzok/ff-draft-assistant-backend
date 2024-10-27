import {Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {SleeperPlayersService} from "./sleeper-players.service";
import {SleeperPlayerDto} from "./dtos/sleeper-player.dto";
import {plainToInstance} from "class-transformer";

@Controller("sleeper-players")
export class SleeperPlayersController {
  constructor(private readonly sleeperPlayersService: SleeperPlayersService) {}

  @Get()
  async getAll() {
    const sleeperPlayers = await this.sleeperPlayersService.getAll();
    return plainToInstance(SleeperPlayerDto, sleeperPlayers, {
      enableImplicitConversion: true,
    });
  }

  @Get("update")
  async getUpdateAll() {
    return this.sleeperPlayersService.updateAll();
  }

  @Post("update")
  async updateAll() {
    return this.sleeperPlayersService.updateAll();
  }

  @Delete()
  async delete() {
    await this.sleeperPlayersService.clearAll();
  }
}
