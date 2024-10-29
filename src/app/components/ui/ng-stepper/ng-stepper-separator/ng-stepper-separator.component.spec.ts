import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgStepperSeparatorComponent } from './ng-stepper-separator.component';

describe('NgStepperSeparatorComponent', () => {
  let component: NgStepperSeparatorComponent;
  let fixture: ComponentFixture<NgStepperSeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgStepperSeparatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgStepperSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
