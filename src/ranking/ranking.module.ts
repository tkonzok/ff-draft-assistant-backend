import { Module } from "@nestjs/common";
import { RankingService } from "./ranking.service";
import { RankingController } from "./ranking.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Player } from "./player.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
