import { Injectable } from "@nestjs/common";
import { Player } from "./player.entity";
import { UpdatePlayerDto } from "./dtos/update-player.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import {SettingsDto} from "./dtos/settings.dto";

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: MongoRepository<Player>,
  ) {}

  async getAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async getSettings(): Promise<{settings: string[]}> {
    const players = await this.getAll();
    const allSettings = new Set<string>();
    players.forEach((player) => {
      Object.keys(player.rankings).forEach((setting) => {
        allSettings.add(setting)
      })
    })
    return {settings: Array.from(allSettings)}
  }

  async clearAll(): Promise<void> {
    await this.playerRepository.delete({});
  }

  async create(updatePlayersDto: UpdatePlayerDto[]): Promise<Player[]> {
    const playersToSave: Player[] = [];

    for (const updatePlayerDto of updatePlayersDto) {
      const existingPlayer = await this.playerRepository.findOne({
            where: { name: updatePlayerDto.name },
          });

      if (existingPlayer) {
        existingPlayer.rankings = {
          ...existingPlayer.rankings,
          ...updatePlayerDto.rankings,
        };

        Object.assign(existingPlayer, {
          ...updatePlayerDto,
          pos: updatePlayerDto.pos ?? existingPlayer.pos,
          team: updatePlayerDto.team ?? existingPlayer.team,
          bye: updatePlayerDto.bye ?? existingPlayer.bye,
          rankings: existingPlayer.rankings,
        });

        playersToSave.push(existingPlayer);
      } else {
        const newPlayer: Player = {
          ...updatePlayerDto,
          pos: updatePlayerDto.pos || "N/A",
          team: updatePlayerDto.team || "N/A",
          bye: updatePlayerDto.bye || "N/A",
          id: uuidv4(),
          rankings: updatePlayerDto.rankings || {},
        } as Player;
        playersToSave.push(newPlayer);
      }
    }
    await this.playerRepository.save(playersToSave);
    return playersToSave;
  }
}
