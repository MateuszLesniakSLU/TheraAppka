import { Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';

@Controller('diary')
export class DiaryController {
    constructor(private readonly diaryService: DiaryService) {}

    /**
     * [POST] /diary
     * Tworzy wpis dziennika.
     */
    @Post()
    create(@Body() dto: CreateDiaryDto) {
        return this.diaryService.createDiary(dto);
    }

    /**
     * [PATCH] /diary/:id
     * Aktualizuje wpis dziennika.
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateDiaryDto) {
        return this.diaryService.updateDiary(id, dto);
    }

    /**
     * [GET] /diary?patientId=...
     * Zwraca wpisy dziennika, opcjonalnie filtrowane po patientId.
     */
    @Get()
    getAll(@Query('patientId') patientId?: string) {
        return this.diaryService.getDiaryEntries(patientId);
    }
}
