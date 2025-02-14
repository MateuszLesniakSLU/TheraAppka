import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: ['doctor', 'patient', 'admin'] })
    role: 'doctor' | 'patient' | 'admin';
}

export const UserSchema = SchemaFactory.createForClass(User);
