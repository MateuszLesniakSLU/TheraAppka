export interface DiaryEntry {
    id: string;
    patientId: string;
    date: string;
    positiveEvents: string;
    negativeEvents: string;
    eventsImpact: { description: string; rating: number }[];
}
