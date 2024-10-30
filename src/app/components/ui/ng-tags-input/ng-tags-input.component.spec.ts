import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTagsInputComponent } from './ng-tags-input.component';

describe('NgTagsInputComponent', () => {
  let component: NgTagsInputComponent;
  let fixture: ComponentFixture<NgTagsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgTagsInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgTagsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
