import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'ng-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table class="w-full text-sm text-left text-foreground">
      <thead class="table-head">
        <ng-container [ngTemplateOutlet]="headerTemplate"></ng-container>
      </thead>

      <tbody class="table-body">
        @for (rowData of value; track $index) {
        <ng-container
          [ngTemplateOutlet]="bodyTemplate"
          [ngTemplateOutletContext]="{
            $implicit: rowData,
            expanded: isRowExpanded(rowData)
          }"
        />

        @if (isRowExpanded(rowData)) {
        <ng-container
          [ngTemplateOutlet]="expandedRowTemplate"
          [ngTemplateOutletContext]="{
            $implicit: rowData
          }"
        />
        } } @if (_loading) {
        <ng-container [ngTemplateOutlet]="loadingBodyTemplate" />
        } @if (isEmpty() && !_loading) {
        <ng-container [ngTemplateOutlet]="emptyMessageTemplate" />
        }
      </tbody>
    </table>
  `,
})
export class NgTableComponent implements AfterContentInit {
  @Input()
  get value() {
    return this._value;
  }

  set value(val: any[]) {
    this._value = val;
  }

  @Input()
  get loading() {
    return this._loading;
  }

  set loading(val: boolean) {
    this._loading = val;
  }

  private _value: any[] = [];

  public _loading!: boolean;

  private _expandedRowKeys: any = {};

  @ContentChild('header') private _headerTemplate!: TemplateRef<any>;

  headerTemplate!: TemplateRef<any>;

  @ContentChild('body') private _bodyTemplate!: TemplateRef<any>;

  bodyTemplate!: TemplateRef<any>;

  @ContentChild('loadingbody') private _loadingBodyTemplate!: TemplateRef<any>;

  loadingBodyTemplate!: TemplateRef<any>;

  @ContentChild('emptymessage')
  private _emptyMessageTemplate!: TemplateRef<any>;

  emptyMessageTemplate!: TemplateRef<any>;

  @ContentChild('expandedrow') private _expandedRowTemplate!: TemplateRef<any>;

  expandedRowTemplate!: TemplateRef<any>;

  ngAfterContentInit(): void {
    this.headerTemplate = this._headerTemplate;

    this.bodyTemplate = this._bodyTemplate;

    this.loadingBodyTemplate = this._loadingBodyTemplate;

    this.emptyMessageTemplate = this._emptyMessageTemplate;

    this.expandedRowTemplate = this._expandedRowTemplate;
  }

  toggleRow(rowData: any) {
    let dataKeyValue = rowData.id;

    this._expandedRowKeys[dataKeyValue] != null
      ? delete this._expandedRowKeys[dataKeyValue]
      : (this._expandedRowKeys[dataKeyValue] = true);
  }

  isEmpty(): boolean {
    let data = this.value;

    return data == null || data.length == 0;
  }

  isRowExpanded(rowData: any): boolean {
    let dataKeyValue = rowData.id;

    return this._expandedRowKeys[dataKeyValue] === true;
  }
}
