import { Component, Input, OnInit } from '@angular/core';
import { cva } from 'class-variance-authority';

export const tagVariant = cva(
  'px-4 py-2 text-xs font-medium rounded-full capitalize',
  {
    variants: {
      variant: {
        rejected: 'text-[#FF9595]',
        accepted: 'text-[#34D399]',
        pending: 'text-[#F9D065]',
        cancelled: 'text-[#FFA667]',
        finished: 'text-[#0EA5E9]',
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
      class="text-xs font-medium uppercase {{ style }}"
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
      style: 'text-[#FF9595]',
    },
    accepted: {
      value: 'aceptado',
      style: 'text-[#34D399]',
    },
    pending: {
      value: 'pendiente',
      style: 'text-[#FACC15]',
    },
    cancelled: {
      value: 'cancelado',
      style: 'text-[#FFA667]',
    },
    finished: {
      value: 'finalizado',
      style: 'text-[#0EA5E9]',
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
