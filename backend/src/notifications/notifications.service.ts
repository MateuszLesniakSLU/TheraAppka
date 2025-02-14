import { Injectable, NotFoundException } from '@nestjs/common';
import { PatientsService } from 'src/patients/patients.service';

@Injectable()
export class NotificationsService {
    constructor(private readonly patientsService: PatientsService) {}

    sendReminder(patientId: string): string {
        const patient = this.patientsService.findOne(patientId);
        if (!patient) {
            throw new NotFoundException(`Patient with ID ${patientId} not found`);
        }

        const message = `Reminder sent to patientId: ${patientId}`;
        console.log(message);
        return message;
    }

    sendDailyReminders(patientIds: string[]): string[] {
        const results: string[] = [];
        for (const id of patientIds) {
            const msg = this.sendReminder(id);
            results.push(msg);
        }
        return results;
    }
}
