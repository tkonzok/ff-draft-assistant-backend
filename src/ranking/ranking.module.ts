import { Module } from "@nestjs/common";
import { RankingService } from "./ranking.service";
import { RankingController } from "./ranking.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Player } from "./player.entity";
import {Draft} from "../draft/draft.entity";
import {DraftService} from "../draft/draft.service";
import {DraftController} from "../draft/draft.controller";
import {DraftModule} from "../draft/draft.module";

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
