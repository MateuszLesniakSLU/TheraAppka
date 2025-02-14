import { IsEmail, IsString, IsIn } from 'class-validator';

export class RegisterDto {
    @IsEmail({}, { message: 'Podaj poprawny adres email' })
    email: string;

    @IsString({ message: 'Hasło musi być tekstem' })
    password: string;

    // Ograniczamy typ do konkretnej unii wartości
    @IsIn(['doctor', 'patient', 'admin'], { message: 'Rola musi być doctor, patient lub admin' })
    role: 'doctor' | 'patient' | 'admin';
}
