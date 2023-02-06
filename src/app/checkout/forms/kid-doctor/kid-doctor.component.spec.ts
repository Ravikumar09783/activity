import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KidDoctorComponent } from './kid-doctor.component';

describe('KidDoctorComponent', () => {
  let component: KidDoctorComponent;
  let fixture: ComponentFixture<KidDoctorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KidDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KidDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
