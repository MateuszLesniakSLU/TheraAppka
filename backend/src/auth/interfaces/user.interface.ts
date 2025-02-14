export interface Patient {
    id: string;
    email: string;
    password: string;
    role: 'patient' | 'doctor' | 'admin';
}
