import { Component, Input, OnInit } from '@angular/core';
import { cva } from 'class-variance-authority';

export const tagVariant = cva(
  'px-4 py-2 text-xs font-medium rounded-full capitalize',
  {
    variants: {
      variant: {
        rejected: 'bg-[#FFE4E6] text-[#FF9595]',
        accepted: 'bg-[#F0FDF4] text-[#34D399]',
        pending: 'bg-[#FEFCE8] text-[#FACC15]',
        cancelled: 'bg-[#FFEDD5] text-[#FFA667]',
        finished: 'bg-[#E0F2FE] text-[#0EA5E9]',
      },
    },
  }
);

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  template: `
    <span
      class="px-4 py-2 text-xs font-medium rounded-full capitalize {{ style }}"
      >{{ value }}</span
    >
  `,
})
export class TagComponent implements OnInit {
  @Input() severity!: string;

  value!: string;
  style!: string;

  variants: any = {
    rejected: {
      value: 'rechazado',
      style: 'bg-[#FFE4E6] text-[#FF9595]',
    },
    accepted: {
      value: 'aceptado',
      style: 'bg-[#F0FDF4] text-[#34D399]',
    },
    pending: {
      value: 'pendiente',
      style: 'bg-[#FEFCE8] text-[#FACC15]',
    },
    cancelled: {
      value: 'cancelado',
      style: 'bg-[#FFEDD5] text-[#FFA667]',
    },
    finished: {
      value: 'finalizado',
      style: 'bg-[#E0F2FE] text-[#0EA5E9]',
    },
  };

  ngOnInit(): void {
    for (const key in this.variants) {
      if (this.severity === key) {
        this.value = this.variants[key].value;
        this.style = this.variants[key].style;
      }
    }
  }
}
