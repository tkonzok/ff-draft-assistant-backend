import { Injectable } from "@nestjs/common";
import { Player } from "./player.entity";
import { UpdatePlayersDto } from "./update-players.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: MongoRepository<Player>,
  ) {}

  async getPlayers(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async clearPlayers(): Promise<void> {
    await this.playerRepository.delete({});
  }

  async create(updatePlayersDto: UpdatePlayersDto[]): Promise<Player[]> {
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
          rankings: existingPlayer.rankings,
        });

        playersToSave.push(existingPlayer);
      } else {
        const newPlayer: Player = {
          ...updatePlayerDto,
          id: uuidv4(),
          rankings: updatePlayerDto.rankings || {},
        } as Player;
        playersToSave.push(newPlayer);
      }
    }
    await this.playerRepository.save(playersToSave);
    return playersToSave;
  }

  async update(updatePlayersDto: UpdatePlayersDto[]): Promise<Player[]> {
    const playersToReturn: Player[] = [];

    for (const dto of updatePlayersDto) {
      let existingPlayer = await this.playerRepository.findOne({
        where: { name: dto.name },
      });
      let playerToSave: Player;

      if (existingPlayer) {
        playerToSave = Object.assign(existingPlayer, dto);
      } else {
        playerToSave = this.playerRepository.create({
          ...dto,
          id: uuidv4(),
          rankings: dto.rankings || {},
        })
      }

      const savedPlayer = await this.playerRepository.save(playerToSave);
      playersToReturn.push(savedPlayer);
    }

    return playersToReturn;
  }
}
