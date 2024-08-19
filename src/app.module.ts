import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RankingModule } from "./ranking/ranking.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./config/typeorm.config";
import {DraftModule} from "./draft/draft.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".dev.env", isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    RankingModule,
    DraftModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
