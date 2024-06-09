import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinPatientComponent } from './join-patient.component';

describe('JoinPatientComponent', () => {
  let component: JoinPatientComponent;
  let fixture: ComponentFixture<JoinPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
