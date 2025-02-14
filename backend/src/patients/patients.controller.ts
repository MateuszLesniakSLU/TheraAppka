import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    NotFoundException,
    UseGuards,
    Req,
    ForbiddenException,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { SurveysService } from 'src/surveys/surveys.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('patients')
export class PatientsController {
    constructor(
        private readonly patientsService: PatientsService,
        private readonly surveysService: SurveysService,
    ) {}

    /**
     * [GET] /patients
     * Zwraca listę pacjentów w zależności od roli:
     * - Lekarz (doctor): tylko pacjenci przypisani do lekarza.
     * - Admin: wszyscy pacjenci.
     */
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getPatients(@Req() req: Request & { user: any }) {
        if (req.user.role === 'doctor') {
            return this.patientsService.findAllByDoctor(req.user.id);
        } else if (req.user.role === 'admin') {
            return this.patientsService.findAll();
        }
        throw new ForbiddenException('Nie masz uprawnień do przeglądania listy pacjentów');
    }

    /**
     * [GET] /patients/:id
     * Pobiera szczegóły jednego pacjenta (dla lekarza, admina i samego pacjenta).
     */
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getOnePatient(@Req() req: Request & { user: any }, @Param('id') id: string) {
        if (req.user.role === 'patient' && req.user.patientId !== id) {
            throw new ForbiddenException('Pacjenci mogą uzyskać dostęp tylko do swoich danych');
        }

        if (req.user.role !== 'doctor' && req.user.role !== 'admin' && req.user.role !== 'patient') {
            throw new ForbiddenException('Tylko lekarze, administratorzy i pacjent mogą zobaczyć szczegóły pacjenta');
        }

        const patient = await this.patientsService.findOne(id);
        if (!patient) {
            throw new NotFoundException('Pacjent nie został znaleziony');
        }
        return patient;
    }

    /**
     * [POST] /patients
     * Tworzenie nowego pacjenta – dostępne tylko dla lekarza.
     */
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createPatient(@Req() req: Request & { user: any }, @Body() dto: CreatePatientDto) {
        if (req.user.role !== 'doctor') {
            throw new ForbiddenException('Tylko lekarze mogą tworzyć pacjentów');
        }

        const newPatient = await this.patientsService.createPatient({
            ...dto,
            assignedDoctorId: req.user.id,
        });

        return newPatient;
    }

    /**
     * [PATCH] /patients/:id
     * Aktualizuje dane pacjenta – dostępne dla lekarza lub admina.
     */
    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async updatePatient(@Req() req: Request & { user: any }, @Param('id') id: string, @Body() dto: UpdatePatientDto) {
        if (req.user.role !== 'doctor' && req.user.role !== 'admin') {
            throw new ForbiddenException('Tylko lekarze i administratorzy mogą edytować dane pacjentów');
        }

        const updated = await this.patientsService.update(id, dto);
        if (!updated) {
            throw new NotFoundException('Pacjent nie został znaleziony');
        }
        return updated;
    }

    /**
     * [DELETE] /patients/:id
     * Usuwa pacjenta – dostępne tylko dla administratora.
     */
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Req() req: Request & { user: any }, @Param('id') id: string) {
        if (req.user.role !== 'admin') {
            throw new ForbiddenException('Tylko administratorzy mogą usuwać pacjentów');
        }

        const deleted = await this.patientsService.remove(id);
        if (!deleted) {
            throw new NotFoundException('Pacjent nie został znaleziony');
        }
        return { message: 'Pacjent został usunięty' };
    }

    /**
     * [GET] /patients/:id/surveys
     * Zwraca ankiety przypisane do konkretnego pacjenta.
     */
    @UseGuards(AuthGuard('jwt'))
    @Get(':id/surveys')
    async getSurveysForPatient(@Req() req: Request & { user: any }, @Param('id') patientId: string) {
        if (req.user.role === 'patient' && req.user.patientId !== patientId) {
            throw new ForbiddenException('Pacjenci mogą uzyskać dostęp tylko do swoich ankiet');
        }

        if (req.user.role !== 'doctor' && req.user.role !== 'admin' && req.user.role !== 'patient') {
            throw new ForbiddenException('Nie masz uprawnień do przeglądania ankiet pacjenta');
        }

        const patient = await this.patientsService.findOne(patientId);
        if (!patient) {
            throw new NotFoundException('Pacjent nie został znaleziony');
        }

        return this.surveysService.getSurveys(patientId);
    }
}
