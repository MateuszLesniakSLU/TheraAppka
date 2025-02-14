import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { Patient } from '../patients/schemas/patient.schema';
import { CreatePatientDto } from "../patients/dto/create-patient.dto";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Patient.name) private patientModel: Model<Patient>,
    ) {}

    /**
     * Logowanie użytkownika
     */
    async login(email: string, password: string) {
        let user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            user = await this.patientModel.findOne({ email }).exec();
        }

        if (!user || !user.password) {
            throw new UnauthorizedException('Nieprawidłowy email lub brak hasła');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Nieprawidłowy email lub hasło');
        }

        const payload = {
            email: user.email,
            role: user.role,
            patientId: user.role === 'patient' ? user.id.toString() : null,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    /**
     * Rejestracja użytkownika (admin/doctor)
     */
    async register(email: string, password: string, role: 'doctor' | 'patient' | 'admin') {
        if (role === 'patient') {
            throw new BadRequestException('Aby zarejestrować pacjenta, użyj metody registerPatient');
        }

        const existingUser = await this.userModel.findOne({ email }).exec();
        if (existingUser) {
            throw new BadRequestException('Użytkownik z tym adresem email już istnieje');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new this.userModel({
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();
        return { message: 'Użytkownik zarejestrowany pomyślnie' };
    }

    /**
     * Rejestracja pacjenta
     */
    async registerPatient(createPatientDto: CreatePatientDto) {
        const existingPatient = await this.patientModel.findOne({ email: createPatientDto.email }).exec();

        if (existingPatient) {
            throw new BadRequestException('Pacjent z tym adresem email już istnieje');
        }

        const hashedPassword = await bcrypt.hash(createPatientDto.password, 10);

        const newPatient = new this.patientModel({
            name: createPatientDto.name,
            email: createPatientDto.email,
            password: hashedPassword,
            phone: createPatientDto.phone,
            assignedDoctorId: createPatientDto.assignedDoctorId,
            role: 'patient',
        });

        await newPatient.save();
        return { message: 'Pacjent zarejestrowany pomyślnie' };
    }
}
