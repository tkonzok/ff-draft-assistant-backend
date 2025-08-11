import { Module } from '@nestjs/common';
import { SleeperPlayersService } from './sleeper-players.service';
import { SleeperPlayersController } from './sleeper-players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SleeperPlayer } from './sleeper-player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SleeperPlayer])],
  controllers: [SleeperPlayersController],
  providers: [SleeperPlayersService],
})
export class SleeperPlayersModule {}
