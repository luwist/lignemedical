import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appNgTooltip]',
  standalone: true,
})
export class NgTooltipDirective {
  @Input() appNgTooltip!: string;

  constructor(private _elRef: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    const div = document.createElement('div');
    div.classList.add('tooltip');
    div.textContent = this.appNgTooltip;

    this._elRef.nativeElement.appendChild(div);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this._elRef.nativeElement.classList.remove('tooltip');

    this._elRef.nativeElement.removeChild(
      this._elRef.nativeElement.querySelector('.tooltip')
    );
  }
}
