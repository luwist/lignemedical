import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinSpecialistComponent } from './join-specialist.component';

describe('JoinSpecialistComponent', () => {
  let component: JoinSpecialistComponent;
  let fixture: ComponentFixture<JoinSpecialistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinSpecialistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
