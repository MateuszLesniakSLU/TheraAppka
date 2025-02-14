import { Controller, Get, Post, Patch, Param, Body, Req, Logger, UnauthorizedException } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { Request } from 'express';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Controller('surveys')
export class SurveysController {
    constructor(private surveysService: SurveysService) {}

    @Post()
    async create(@Req() req: Request, @Body() body: CreateSurveyDto) {
        Logger.log(`Tworzenie ankiety z danymi: ${JSON.stringify(body)}`);

        if (!body.patientId) {
            throw new UnauthorizedException('patientId jest wymagany');
        }

        return this.surveysService.createSurvey(body);
    }

    @Get()
    async getSurveys(@Req() req: Request) {
        Logger.log(`Pobieranie ankiet`);

        return this.surveysService.getSurveys(req.query.patientId as string);
    }

    @Get(':id')
    async getSurvey(@Param('id') id: string) {
        return this.surveysService.findOne(id);
    }

    @Patch(':id')
    async updateSurvey(@Param('id') id: string, @Body() body: UpdateSurveyDto) {
        return this.surveysService.updateSurvey(id, body);
    }
}
