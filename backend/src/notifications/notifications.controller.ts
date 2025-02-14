import { Controller, Post, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    /**
     * Jednorazowe wywołanie wysyłki powiadomienia do określonego pacjenta
     * np. POST /notifications/sendReminder/abc123
     */
    @Post('sendReminder/:patientId')
    sendReminder(@Param('patientId') patientId: string) {
        return this.notificationsService.sendReminder(patientId);
    }
}
