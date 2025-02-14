import {Controller, Post, Body, HttpCode, BadRequestException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CreatePatientDto } from "../patients/dto/create-patient.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto.email, registerDto.password, registerDto.role);
    }

    @Post('register-patient')
    async registerPatient(@Body() createPatientDto: CreatePatientDto) {
        if (!createPatientDto.name) {
            throw new BadRequestException('Pacjent musi mieć imię');
        }
        return this.authService.registerPatient(createPatientDto);
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.email, loginDto.password);
    }
}
