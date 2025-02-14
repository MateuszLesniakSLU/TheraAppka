import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { Patient } from '../../patients/schemas/patient.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Patient.name) private patientModel: Model<Patient>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'superSecretKey',
        });
    }

    async validate(payload: any) {
        console.log('Token payload:', payload);

        let user = await this.userModel.findOne({ email: payload.email }).exec();
        if (!user) {
            user = await this.patientModel.findOne({ email: payload.email }).exec();
        }

        console.log('User found:', user);

        if (!user) {
            throw new UnauthorizedException('Niepoprawny token lub użytkownik nie istnieje');
        }

        return user;
    }
}
