import {
    IsArray,
    IsBoolean,
    IsIn,
    IsNumber,
    IsOptional,
    IsString,
    Min,
    Max
} from 'class-validator';

export class UpdateSurveyDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10)
    moodScore?: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    moodInfluencingFactors?: string[];

    @IsOptional()
    @IsString()
    positiveEvents?: string;

    @IsOptional()
    @IsString()
    negativeEvents?: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10)
    eventsImpact?: number;

    @IsOptional()
    @IsBoolean()
    tookMedication?: boolean;

    @IsOptional()
    @IsString()
    medicationNotTakenReason?: string;

    @IsOptional()
    @IsBoolean()
    sideEffectsOccurred?: boolean;

    @IsOptional()
    @IsString()
    sideEffectsDescription?: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10)
    postMedicationFeeling?: number;

    @IsOptional()
    @IsIn(['yes', 'no', 'unknown'])
    medicationEffectiveness?: 'yes' | 'no' | 'unknown';

    @IsOptional()
    @IsString()
    medicationEffectivenessReason?: string;
}
