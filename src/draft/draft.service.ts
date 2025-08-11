import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { PlayerStatus } from '../player/player-status.enum';
import { PlayerService } from '../player/player.service';
import { CreateDraftDto } from './dtos/create-draft.dto';
import { Draft } from './draft.entity';
import { UpdateDraftDto } from './dtos/update-draft.dto';

@Injectable()
export class DraftService {
  private readonly history: Record<string, PlayerStatus>[] = [];

  constructor(
    @InjectRepository(Draft)
    private readonly draftRepository: MongoRepository<Draft>,
    private readonly rankingService: PlayerService,
  ) {}

  async getAll(): Promise<Draft[]> {
    return this.draftRepository.find();
  }

  async create(partialCreateDraftDto: Partial<CreateDraftDto>): Promise<Draft> {
    const players = await this.rankingService.getAll();
    const playerStates: Record<string, PlayerStatus> = {};
    players.forEach((player) => {
      playerStates[player.id.toString()] = PlayerStatus.AVAILABLE;
    });
    const draftObject: Partial<CreateDraftDto> = {
      ...partialCreateDraftDto,
      playerStates,
    };
    const fullCreateDraftDto = plainToInstance(CreateDraftDto, draftObject);
    const errors = await validate(fullCreateDraftDto);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return await this.draftRepository.save(fullCreateDraftDto);
  }

  async update(id: string, updateDraftDto: UpdateDraftDto): Promise<Draft> {
    const draft = await this.draftRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!draft) {
      throw new NotFoundException(`Draft with id ${id} not found`);
    }
    if (updateDraftDto.playerStates) {
      const key = Object.keys(updateDraftDto.playerStates)[0];
      const currentPlayerState = draft.playerStates[key];
      this.history.push({
        [key]: currentPlayerState,
      });
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

  async reset(id: string): Promise<Draft> {
    const draft = await this.draftRepository.findOneBy({
      _id: new ObjectId(id),
    });
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

  async undo(id: string): Promise<Draft> {
    const draft = await this.draftRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!draft) {
      throw new NotFoundException(`Draft with id ${id} not found`);
    }
    if (this.history.length > 0) {
      const lastEntry = this.history.pop();
      if (lastEntry) {
        for (const key of Object.keys(lastEntry)) {
          draft.playerStates[key] = lastEntry[key];
        }
      }
    }
    return await this.draftRepository.save(draft);
  }
}
