import {Expose} from "class-transformer";
import {IsArray, IsNotEmpty} from "class-validator";

export class SettingsDto {
  @Expose()
  @IsNotEmpty()
  @IsArray()
  settings: string[];
}
