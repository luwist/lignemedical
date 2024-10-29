import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgStepperItemComponent } from './ng-stepper-item.component';

describe('NgStepperItemComponent', () => {
  let component: NgStepperItemComponent;
  let fixture: ComponentFixture<NgStepperItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgStepperItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgStepperItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
