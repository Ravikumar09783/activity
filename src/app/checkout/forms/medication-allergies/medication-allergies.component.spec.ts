import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MedicationAllergiesComponent } from './medication-allergies.component';

describe('MedicationAllergiesComponent', () => {
  let component: MedicationAllergiesComponent;
  let fixture: ComponentFixture<MedicationAllergiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicationAllergiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationAllergiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
