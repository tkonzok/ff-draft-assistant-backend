import { Expose, Type } from "class-transformer";
import { IsObject, ValidateNested, IsArray, IsString } from "class-validator";

export class SettingsDto {
  @Expose()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => SettingsArrayDto)
  settings: Record<string, SettingsArrayDto>;
}

export class SettingsArrayDto {
  @IsArray()
  @IsString({ each: true })
  values: string[];
}
