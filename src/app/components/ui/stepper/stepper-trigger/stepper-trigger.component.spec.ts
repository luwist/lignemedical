import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperTriggerComponent } from './stepper-trigger.component';

describe('StepperTriggerComponent', () => {
  let component: StepperTriggerComponent;
  let fixture: ComponentFixture<StepperTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperTriggerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepperTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
