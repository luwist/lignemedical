import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgNumberInputComponent } from './ng-number-input.component';

describe('NgNumberInputComponent', () => {
  let component: NgNumberInputComponent;
  let fixture: ComponentFixture<NgNumberInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgNumberInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgNumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
