import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Draft } from "../draft/draft.entity";
import { Player } from "../player/player.entity";
import {SleeperPlayer} from "../sleeper/sleeper-player.entity";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mongodb",
      url: this.configService.get<string>("DB_URI"),
      database: this.configService.get<string>("DB_NAME"),
      entities: [Player, Draft, SleeperPlayer],
      useUnifiedTopology: true,
      synchronize: false,
      autoLoadEntities: true,
    };
  }
}
