import { Component } from '@angular/core';
import { AppointmentCardComponent } from '@app/components';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [AppointmentCardComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
})
export class AppointmentComponent {
  doctors = [
    {
      name: 'Ana López',
      speciality: 'Cardiología',
      date: '3 de Julio de 2024',
      hour: '11:00 - 11:30 am',
      status: 'pending',
    },
    {
      name: 'María Fernández',
      speciality: 'Dermatología',
      date: '3 de Julio de 2024',
      hour: '12:00 - 12:30 pm',
      status: 'accepted',
    },
    {
      name: 'Luis Martínez',
      speciality: 'Neurología',
      date: '3 de Julio de 2024',
      hour: '1:00 - 1:30 pm',
      status: 'rejected',
    },
    {
      name: 'Sofía García',
      speciality: 'Ginecología',
      date: '3 de Julio de 2024',
      hour: '2:00 - 2:30 pm',
      status: 'finished',
    },
    {
      name: 'Javier Sánchez',
      speciality: 'Oftalmología',
      date: '3 de Julio de 2024',
      hour: '3:00 - 3:30 pm',
      status: 'cancelled',
    },
    {
      name: 'Laura Ruiz',
      speciality: 'Psicología',
      date: '3 de Julio de 2024',
      hour: '4:00 - 4:30 pm',
      status: 'pending',
    },
    {
      name: 'Pablo Torres',
      speciality: 'Urología',
      date: '3 de Julio de 2024',
      hour: '5:00 - 5:30 pm',
      status: 'accepted',
    },
    {
      name: 'Elena Morales',
      speciality: 'Endocrinología',
      date: '3 de Julio de 2024',
      hour: '6:00 - 6:30 pm',
      status: 'rejected',
    },
    {
      name: 'Diego Navarro',
      speciality: 'Neumología',
      date: '3 de Julio de 2024',
      hour: '7:00 - 7:30 pm',
      status: 'finished',
    },
    {
      name: 'Isabel Rojas',
      speciality: 'Reumatología',
      date: '3 de Julio de 2024',
      hour: '8:00 - 8:30 pm',
      status: 'cancelled',
    },
  ];
}
