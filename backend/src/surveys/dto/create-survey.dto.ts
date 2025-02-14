import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min, Max, IsIn } from 'class-validator';

export class CreateSurveyDto {
    @IsString()
    patientId: string;

    @IsNumber()
    @Min(1)
    @Max(10)
    moodScore: number;

    @IsArray()
    @IsString({ each: true })
    moodInfluencingFactors: string[];

    @IsNotEmpty({ message: 'Proszę opisać pozytywne wydarzenia' })
    @IsString()
    positiveEvents: string;

    @IsNotEmpty({ message: 'Proszę opisać negatywne wydarzenia' })
    @IsString()
    negativeEvents: string;

    @IsNumber()
    @Min(1)
    @Max(10)
    eventsImpact: number;

    @IsBoolean()
    tookMedication: boolean;

    @IsOptional()
    @IsString()
    medicationNotTakenReason?: string;

    @IsBoolean()
    sideEffectsOccurred: boolean;

    @IsOptional()
    @IsString()
    sideEffectsDescription?: string;

    @IsNumber()
    @Min(1)
    @Max(10)
    postMedicationFeeling: number;

    @IsIn(['yes', 'no', 'unknown'], { message: 'Skuteczność musi być: yes, no lub unknown' })
    medicationEffectiveness: 'yes' | 'no' | 'unknown';

    @IsOptional()
    @IsString()
    medicationEffectivenessReason?: string;
}
