import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Survey extends Document {
    @Prop({ required: true })
    patientId: string;

    @Prop({ required: true, default: () => new Date().toISOString().split('T')[0] }) // YYYY-MM-DD
    date: string;

    @Prop({ required: true, min: 1, max: 10 })
    moodScore: number;

    @Prop({ type: [String] })
    moodInfluencingFactors: string[];

    @Prop()
    positiveEvents?: string;

    @Prop()
    negativeEvents?: string;

    @Prop({ required: true, min: 1, max: 10 })
    eventsImpact: number;

    @Prop({ required: true })
    tookMedication: boolean;

    @Prop()
    medicationNotTakenReason?: string;

    @Prop({ required: true })
    sideEffectsOccurred: boolean;

    @Prop()
    sideEffectsDescription?: string;

    @Prop({ required: true, min: 1, max: 10 })
    postMedicationFeeling: number;

    @Prop({ required: true, enum: ['yes', 'no', 'unknown'] })
    medicationEffectiveness: 'yes' | 'no' | 'unknown';

    @Prop()
    medicationEffectivenessReason?: string;
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
