import {IsString, IsEmail, IsOptional, IsNotEmpty, MinLength} from 'class-validator';

export class CreatePatientDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Hasło musi mieć co najmniej 6 znaków' })
    password: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    assignedDoctorId?: string;
}
