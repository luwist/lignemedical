interface Doctor {
    id: string;
    name: string;
    picture: string;
    specialty: string;
}

interface Patient {
    id: string;
    name: string;
    picture: string;
}

export interface Appointment {
    id: string;
    isAvailable: boolean;
    date: any;
    hour: any;
    doctor: Doctor;
    patient: Patient;
    status: string;
    message?: string;
}