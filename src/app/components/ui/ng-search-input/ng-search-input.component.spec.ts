import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSearchInputComponent } from './ng-search-input.component';

describe('NgSearchInputComponent', () => {
  let component: NgSearchInputComponent;
  let fixture: ComponentFixture<NgSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgSearchInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
