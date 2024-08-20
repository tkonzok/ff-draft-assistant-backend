import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ObjectId } from "mongodb";
import { MongoRepository } from "typeorm";
import { PlayerStatus } from "../ranking/player-status.enum";
import { RankingService } from "../ranking/ranking.service";
import { CreateDraftDto } from "./create-draft.dto";
import { Draft } from "./draft.entity";
import { UpdateDraftDto } from "./update-draft.dto";

@Injectable()
export class DraftService {
  constructor(
    @InjectRepository(Draft)
    private readonly draftRepository: MongoRepository<Draft>,
    private readonly rankingService: RankingService,
  ) {}

  async getAll(): Promise<Draft[]> {
    return this.draftRepository.find();
  }

  async create(partialCreateDraftDto: Partial<CreateDraftDto>): Promise<Draft> {
    const players = await this.rankingService.getPlayers();
    const playerStates: Record<string, PlayerStatus> = {};
    players.forEach((player) => {
      playerStates[player.id.toString()] = PlayerStatus.AVAILABLE;
    });
    const draftObject: Partial<CreateDraftDto> = { ...partialCreateDraftDto, playerStates };
    const fullCreateDraftDto = plainToInstance(CreateDraftDto, draftObject);
    const errors = await validate(fullCreateDraftDto);
    if (errors.length > 0) {
      throw new BadRequestException("Validation failed");
    }
    return await this.draftRepository.save(fullCreateDraftDto);
  }

  async update(id: string, updateDraftDto: UpdateDraftDto): Promise<Draft> {
    const draft = await this.draftRepository.findOneBy({ _id: new ObjectId(id) });
    if (!draft) {
      throw new NotFoundException(`Draft with id ${id} not found`);
    }
    Object.assign(draft, {
      ...updateDraftDto,
      playerStates: {
        ...draft.playerStates,
        ...updateDraftDto.playerStates,
      },
    });
    return await this.draftRepository.save(draft);
  }

  async updatePlayerIds(oldId: string, newId: string): Promise<void> {
    const drafts = await this.draftRepository.find();
    const updatedDrafts = drafts.map((draft) => {
      if (!draft) {
        throw new NotFoundException(`Draft with id ${draft.id} not found`);
      }
      if (draft.playerStates[oldId] === undefined) {
        throw new NotFoundException(`Player state with id ${oldId} not found in draft`);
      }
      draft.playerStates[newId] = draft.playerStates[oldId];
      delete draft.playerStates[oldId];
      return draft;
    })
    await this.draftRepository.save(updatedDrafts);
  }

  async reset(id: string): Promise<Draft> {
    const draft = await this.draftRepository.findOneBy({ _id: new ObjectId(id) });
    if (!draft) {
      throw new NotFoundException(`Draft with id ${id} not found`);
    }
    Object.keys(draft.playerStates).forEach((key: string) => {
      draft.playerStates[key] = PlayerStatus.AVAILABLE;
    });
    return await this.draftRepository.save(draft);
  }

  async deleteOne(id: string): Promise<void> {
    const objectId = new ObjectId(id);
    await this.draftRepository.delete(objectId);
  }

  async deleteAll(): Promise<void> {
    await this.draftRepository.delete({});
  }
}
