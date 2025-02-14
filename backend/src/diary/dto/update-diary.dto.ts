import {
    IsArray,
    IsDateString,
    IsOptional,
    IsString,
    ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

export class EventImpactDto {
    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    rating?: number;
}

export class UpdateDiaryDto {
    @IsOptional()
    @IsDateString()
    date?: string;

    @IsOptional()
    @IsString()
    positiveEvents?: string;

    @IsOptional()
    @IsString()
    negativeEvents?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EventImpactDto)
    eventsImpact?: EventImpactDto[];
}
