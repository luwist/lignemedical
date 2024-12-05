import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndAppointmentComponent } from './end-appointment.component';

describe('EndAppointmentComponent', () => {
  let component: EndAppointmentComponent;
  let fixture: ComponentFixture<EndAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EndAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
