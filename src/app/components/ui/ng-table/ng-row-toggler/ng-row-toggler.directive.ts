import { Directive, HostListener, Input } from '@angular/core';
import { NgTableComponent } from '../ng-table.component';

@Directive({
  selector: '[ngRowToggler]',
  standalone: true,
})
export class NgRowTogglerDirective {
  @Input('ngRowToggler') data: any;

  constructor(public dt: NgTableComponent) {}

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    this.dt.toggleRow(this.data);

    event.preventDefault();
  }
}
