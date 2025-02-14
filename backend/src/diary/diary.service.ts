import { Injectable, BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { DiaryEntry } from './diary.interface';

@Injectable()
export class DiaryService {
    private entries: DiaryEntry[] = [];

    // Zwraca dzisiejszą datę w formacie YYYY-MM-DD
    private getTodayDate(): string {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    /**
     * Tworzy wpis dziennika dla danego pacjenta w określonym dniu.
     * Jeśli wpis dla tego pacjenta i daty już istnieje, rzuca wyjątek.
     */
    createDiary(dto: CreateDiaryDto): DiaryEntry {
        const existing = this.entries.find(
            (e) => e.patientId === dto.patientId && e.date === dto.date
        );
        if (existing) {
            throw new BadRequestException('Wpis dziennika na ten dzień już istnieje');
        }
        const transformedEventsImpact = dto.eventsImpact.map((event) => {
            if (event.rating === undefined) {
                throw new BadRequestException('Ocena wpływu (rating) jest wymagana dla każdego wydarzenia');
            }
            return {
                description: event.description ?? '',
                rating: event.rating,
            };
        });
        const newEntry: DiaryEntry = {
            id: uuid(),
            patientId: dto.patientId,
            date: dto.date,
            positiveEvents: dto.positiveEvents,
            negativeEvents: dto.negativeEvents,
            eventsImpact: transformedEventsImpact,
        };

        this.entries.push(newEntry);
        return newEntry;
    }

    /**
     * Aktualizuje wpis dziennika.
     * Edycja jest możliwa tylko dla wpisu z dzisiejszego dnia, pod warunkiem, że aktualny czas jest przed końcem dnia (23:59:59).
     */
    updateDiary(id: string, dto: UpdateDiaryDto): DiaryEntry {
        const index = this.entries.findIndex((e) => e.id === id);
        if (index === -1) {
            throw new BadRequestException('Wpis dziennika nie został znaleziony');
        }
        const entry = this.entries[index];
        const today = this.getTodayDate();
        if (entry.date !== today) {
            throw new BadRequestException('Edycja jest możliwa tylko dla wpisu z dzisiejszego dnia');
        }
        const endOfDay = new Date(`${entry.date}T23:59:59`);
        if (new Date() > endOfDay) {
            throw new BadRequestException('Nie można edytować wpisu – minął czas edycji (koniec dnia)');
        }
        let transformedEventsImpact = entry.eventsImpact;
        if (dto.eventsImpact) {
            transformedEventsImpact = dto.eventsImpact.map((event) => {
                if (event.rating === undefined) {
                    throw new BadRequestException('Ocena wpływu (rating) jest wymagana dla każdego wydarzenia');
                }
                return {
                    description: event.description ?? '',
                    rating: event.rating,
                };
            });
        }
        const updatedEntry: DiaryEntry = {
            ...entry,
            ...dto,
            eventsImpact: transformedEventsImpact,
        };

        this.entries[index] = updatedEntry;
        return updatedEntry;
    }

    /**
     * Zwraca wpisy dziennika.
     * Jeśli przekazany zostanie patientId, zwraca wpisy tylko danego pacjenta.
     */
    getDiaryEntries(patientId?: string): DiaryEntry[] {
        if (patientId) {
            return this.entries.filter((e) => e.patientId === patientId);
        }
        return this.entries;
    }
}
