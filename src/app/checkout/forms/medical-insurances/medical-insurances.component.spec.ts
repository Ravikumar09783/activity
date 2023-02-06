import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MedicalInsurancesComponent } from './medical-insurances.component';

describe('MedicalInsurancesComponent', () => {
  let component: MedicalInsurancesComponent;
  let fixture: ComponentFixture<MedicalInsurancesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalInsurancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalInsurancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
