import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Draft} from "./draft.entity";
import {RankingModule} from "../ranking/ranking.module";
import {DraftController} from "./draft.controller";
import {DraftService} from "./draft.service";
import {RankingService} from "../ranking/ranking.service";
import {Player} from "../ranking/player.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Draft, Player]), RankingModule],
  controllers: [DraftController],
  providers: [DraftService, RankingService],
})
export class DraftModule {}
