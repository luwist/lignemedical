import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgStepperListComponent } from './ng-stepper-list.component';

describe('NgStepperListComponent', () => {
  let component: NgStepperListComponent;
  let fixture: ComponentFixture<NgStepperListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgStepperListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgStepperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
