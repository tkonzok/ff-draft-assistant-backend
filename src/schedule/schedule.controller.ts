import {Controller, Delete, Get, Post} from "@nestjs/common";
import {ScheduleService} from "./schedule.service";
import {plainToInstance} from "class-transformer";
import {ScheduleDto} from "./dtos/schedule.dto";

@Controller("schedule")
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  async getAll() {
    const schedule = await this.scheduleService.getAll();
    return plainToInstance(ScheduleDto, schedule);
  }

  @Post("update")
  async uploadSchedule() {
    return await this.scheduleService.uploadSchedule()
  }

  @Delete()
  async delete() {
    await this.scheduleService.clearAll();
  }
}
