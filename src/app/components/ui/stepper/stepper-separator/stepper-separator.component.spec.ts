import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperSeparatorComponent } from './stepper-separator.component';

describe('StepperSeparatorComponent', () => {
  let component: StepperSeparatorComponent;
  let fixture: ComponentFixture<StepperSeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperSeparatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepperSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
