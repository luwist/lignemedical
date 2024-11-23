import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSpecialityComponent } from './choose-speciality.component';

describe('ChooseSpecialityComponent', () => {
  let component: ChooseSpecialityComponent;
  let fixture: ComponentFixture<ChooseSpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseSpecialityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
