import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgStepperComponent } from './ng-stepper.component';

describe('NgStepperComponent', () => {
  let component: NgStepperComponent;
  let fixture: ComponentFixture<NgStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgStepperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
