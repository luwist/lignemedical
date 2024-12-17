import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePatientComponent } from './choose-patient.component';

describe('ChoosePatientComponent', () => {
  let component: ChoosePatientComponent;
  let fixture: ComponentFixture<ChoosePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoosePatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChoosePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
