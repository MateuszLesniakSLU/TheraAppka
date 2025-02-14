import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Survey } from './schemas/survey.schema';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Injectable()
export class SurveysService {
    constructor(@InjectModel(Survey.name) private surveyModel: Model<Survey>) {}

    private getTodayDate(): string {
        return new Date().toISOString().split('T')[0];
    }

    /**
     * Tworzy ankietę dla pacjenta na dzisiaj.
     * Jeśli ankieta dla danego pacjenta już istnieje dla dzisiejszego dnia, rzuca wyjątek.
     */
    async createSurvey(dto: CreateSurveyDto): Promise<Survey> {
        if (!dto.patientId) {
            throw new BadRequestException('patientId jest wymagany');
        }

        const today = this.getTodayDate();
        const existingSurvey = await this.surveyModel.findOne({
            patientId: dto.patientId,
            date: today
        }).exec();

        if (existingSurvey) {
            throw new BadRequestException('Ankieta na dzisiaj już istnieje');
        }

        const newSurvey = new this.surveyModel({ ...dto, date: today });
        return newSurvey.save();
    }

    /**
     * Aktualizuje istniejącą ankietę dla dzisiejszego dnia.
     */
    async updateSurvey(id: string, dto: UpdateSurveyDto): Promise<Survey> {
        const survey = await this.surveyModel.findByIdAndUpdate(id, dto, { new: true }).exec();

        if (!survey) {
            throw new NotFoundException('Ankieta nie została znaleziona');
        }

        return survey;
    }

    /**
     * Pobiera wszystkie ankiety pacjenta.
     */
    async getSurveys(patientId: string): Promise<Survey[]> {
        return this.surveyModel.find({ patientId }).sort({ date: -1 }).exec();
    }

    /**
     * Pobiera ankietę po ID.
     */
    async findOne(id: string): Promise<Survey> {
        const survey = await this.surveyModel.findById(id).exec();
        if (!survey) {
            throw new NotFoundException('Ankieta nie została znaleziona');
        }
        return survey;
    }
}
