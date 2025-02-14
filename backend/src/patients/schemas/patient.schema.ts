import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Patient extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    phone?: string;

    @Prop({ required: true, enum: ['patient'] })
    role: 'patient';

    @Prop()
    assignedDoctorId?: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
