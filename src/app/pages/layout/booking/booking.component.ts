import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {
  specialties = [
    'Cardiólogo',
    'Pediatra',
    'Psicólogo',
    'Dermatólogo',
    'Neurólogo',
    'Ginecólogo',
    'Oftalmólogo',
    'Otorrinolaringólogo',
    'Ortopedista',
    'Gastroenterólogo',
    'Endocrinólogo',
    'Oncólogo',
    'Urólogo',
    'Reumatólogo',
    'Psiquiatra',
    'Neumólogo',
    'Nefrólogo',
    'Hematólogo',
    'Infectólogo',
    'Médico General',
    'Médico Internista',
    'Traumatólogo',
    'Allergólogo',
    'Cirujano General',
    'Cirujano Plástico',
    'Cirujano Cardiovascular',
    'Cirujano de Mano',
    'Cirujano de Tórax',
    'Cirujano Pediátrico',
    'Anestesiólogo',
    'Médico del Deporte',
    'Médico de Emergencias',
    'Geriatra',
    'Patólogo',
    'Radiólogo',
    'Médico de Familia',
    'Nutriólogo',
    'Fisiatra',
    'Médico Estético',
  ];

  doctors = [
    {
      id: 1,
      name: 'Jhoe Doe',
      specialty: 'Cardiólogo',
      imageSrc: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      specialty: 'Pediatra',
      imageSrc: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      id: 3,
      name: 'Carlos González',
      specialty: 'Dermatólogo',
      imageSrc: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      id: 4,
      name: 'Ana Martínez',
      specialty: 'Neurólogo',
      imageSrc: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
      id: 5,
      name: 'Roberto Fernández',
      specialty: 'Ginecólogo',
      imageSrc: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      id: 6,
      name: 'Laura Pérez',
      specialty: 'Oftalmólogo',
      imageSrc: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      id: 7,
      name: 'José Ramírez',
      specialty: 'Otorrinolaringólogo',
      imageSrc: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      id: 8,
      name: 'María López',
      specialty: 'Ortopedista',
      imageSrc: 'https://randomuser.me/api/portraits/women/8.jpg',
    },
    {
      id: 9,
      name: 'Luis García',
      specialty: 'Gastroenterólogo',
      imageSrc: 'https://randomuser.me/api/portraits/men/9.jpg',
    },
    {
      id: 10,
      name: 'Carmen Sánchez',
      specialty: 'Endocrinólogo',
      imageSrc: 'https://randomuser.me/api/portraits/women/10.jpg',
    },
  ];

  indexSelected!: number;

  onSelect(index: number): void {
    this.indexSelected = index;
  }
}
