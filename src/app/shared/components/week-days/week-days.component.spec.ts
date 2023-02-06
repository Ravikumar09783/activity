import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WeekDaysComponent } from './week-days.component';

describe('WeekDaysComponent', () => {
  let component: WeekDaysComponent;
  let fixture: ComponentFixture<WeekDaysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
