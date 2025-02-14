import { Module } from '@nestjs/common';
import { PatientsModule } from './patients/patients.module';
import { SurveysModule } from './surveys/surveys.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';
import { DiaryModule } from './diary/diary.module';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [
      PatientsModule,
      SurveysModule,
      NotificationsModule,
      AuthModule,
      DiaryModule,
      MongooseModule.forRoot('mongodb://localhost:27017/TheraApp')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
