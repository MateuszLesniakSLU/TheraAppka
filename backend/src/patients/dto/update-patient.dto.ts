import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdatePatientDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    phone?: string;
}
