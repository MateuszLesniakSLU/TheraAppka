import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from './schemas/patient.schema';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { SurveysService } from '../surveys/surveys.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PatientsService {
    constructor(
        @InjectModel(Patient.name) private patientModel: Model<Patient>,
        private readonly surveysService: SurveysService,
    ) {}

    /**
     * Pobiera wszystkich pacjentów (dla administratora).
     */
    async findAll(): Promise<any[]> {
        const patients = await this.patientModel.find().exec();
        return this.enrichPatientsWithSurveyData(patients);
    }

    /**
     * Pobiera pacjentów przypisanych do konkretnego lekarza.
     */
    async findAllByDoctor(doctorId: string): Promise<any[]> {
        const patients = await this.patientModel.find({ assignedDoctorId: doctorId }).exec();
        return this.enrichPatientsWithSurveyData(patients);
    }

    /**
     * Pobiera pojedynczego pacjenta po ID.
     */
    async findOne(id: string): Promise<any> {
        const patient = await this.patientModel.findById(id).exec();
        if (!patient) throw new NotFoundException('Pacjent nie został znaleziony');
        return this.enrichSinglePatientWithSurveyData(patient);
    }

    /**
     * Tworzy nowego pacjenta (tylko dla lekarza).
     */
    async createPatient(dto: CreatePatientDto): Promise<Patient> {
        const existingPatient = await this.patientModel.findOne({ email: dto.email }).exec();
        if (existingPatient) {
            throw new BadRequestException('Pacjent z tym adresem email już istnieje');
        }

        // Upewniamy się, że hasło zostało podane
        if (!dto.password || dto.password.length < 6) {
            throw new BadRequestException('Hasło jest wymagane i musi mieć co najmniej 6 znaków');
        }

        // Hashowanie hasła przed zapisaniem
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const newPatient = new this.patientModel({
            ...dto,
            password: hashedPassword,
        });

        return newPatient.save();
    }

    /**
     * Aktualizuje dane pacjenta (dla lekarza i administratora).
     */
    async update(id: string, dto: UpdatePatientDto): Promise<Patient> {
        const updatedPatient = await this.patientModel.findByIdAndUpdate(id, dto, { new: true }).exec();
        if (!updatedPatient) throw new NotFoundException('Pacjent nie został znaleziony');
        return updatedPatient;
    }

    /**
     * Usuwa pacjenta (tylko dla administratora).
     */
    async remove(id: string): Promise<boolean> {
        const result = await this.patientModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException('Pacjent nie został znaleziony');
        }
        return true;
    }

    /**
     * Wzbogaca pacjentów o dane z ankiet (średni nastrój, ostatnia ankieta).
     */
    private async enrichPatientsWithSurveyData(patients: Patient[]): Promise<any[]> {
        return Promise.all(patients.map(async (patient) => this.enrichSinglePatientWithSurveyData(patient)));
    }

    /**
     * Pobiera średni nastrój i datę ostatniej ankiety dla danego pacjenta.
     */
    private async enrichSinglePatientWithSurveyData(patient: Patient): Promise<any> {
        const surveys = await this.surveysService.getSurveys(patient.id.toString());

        const moodAverage = surveys.length > 0
            ? (surveys.reduce((sum, survey) => sum + survey.moodScore, 0) / surveys.length).toFixed(1)
            : null;

        const lastSurveyDate = surveys.length > 0 ? surveys[0].date : null;

        return {
            _id: patient._id,
            name: patient.name,
            email: patient.email,
            assignedDoctorId: patient.assignedDoctorId,
            lastSurveyDate,
            moodAverage,
        };
    }
}
