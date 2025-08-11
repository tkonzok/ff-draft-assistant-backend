import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Draft } from './draft.entity';
import { PlayerModule } from '../player/player.module';
import { DraftController } from './draft.controller';
import { DraftService } from './draft.service';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Draft, Player]), PlayerModule],
  controllers: [DraftController],
  providers: [DraftService, PlayerService],
})
export class DraftModule {}
