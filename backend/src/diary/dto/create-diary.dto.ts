import {
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsString,
    ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

export class EventImpactDto {
    @IsString()
    @IsNotEmpty({ message: 'Podaj opis wydarzenia.' })
    description: string;

    @IsNotEmpty({ message: 'Podaj ocenę wpływu (1-10).' })
    rating: number;
}

export class CreateDiaryDto {
    @IsString()
    patientId: string;

    @IsDateString()
    date: string; // Format "YYYY-MM-DD"

    @IsString()
    @IsNotEmpty({ message: 'Podaj, co pozytywnego wydarzyło się dzisiaj.' })
    positiveEvents: string;

    @IsString()
    @IsNotEmpty({ message: 'Podaj, co negatywnego wydarzyło się dzisiaj.' })
    negativeEvents: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EventImpactDto)
    eventsImpact: EventImpactDto[];
}
