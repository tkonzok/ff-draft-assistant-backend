import {
  Body,
  Controller, Delete, Get, Param, Post, Put,
} from "@nestjs/common";
import {DraftService} from "./draft.service";
import {plainToInstance} from "class-transformer";
import {DraftDto} from "./dtos/draft.dto";
import {UpdateDraftDto} from "./dtos/update-draft.dto";
import {CreateDraftDto} from "./dtos/create-draft.dto";

@Controller("drafts")
export class DraftController {
  constructor(private readonly draftService: DraftService) {}

  @Get()
  async getAll() {
    const drafts = await this.draftService.getAll();
    return plainToInstance(DraftDto, drafts, {
      enableImplicitConversion: true,
    })
  }

  @Post()
  async create(
    @Body() createDraftDto: Partial<CreateDraftDto>
  ) {
    const draft = await this.draftService.create(createDraftDto);
    return plainToInstance(DraftDto, draft, {
      enableImplicitConversion: true,
    })
  }

  @Post(":id/undo")
  async undo(
    @Param("id") id: string,
  ) {
    const updatedDraft = await this.draftService.undo(id);
    return plainToInstance(DraftDto, updatedDraft, {
      enableImplicitConversion: true,
    });
  }

  @Put(":id/reset")
  async reset(
    @Param("id") id: string,
  ) {
    const updatedDraft = await this.draftService.reset(id);
    return plainToInstance(DraftDto, updatedDraft, {
      enableImplicitConversion: true,
    });
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDraftDto: UpdateDraftDto
  ) {
    const updatedDraft = await this.draftService.update(id, updateDraftDto);
    return plainToInstance(DraftDto, updatedDraft, {
      enableImplicitConversion: true,
    });
  }

  @Delete(":id")
  async deleteOne(@Param("id") id: string) {
    await this.draftService.deleteOne(id);
  }

  @Delete()
  async deleteAll() {
    await this.draftService.deleteAll();
  }
}
