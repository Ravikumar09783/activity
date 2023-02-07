import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalInsurancesComponent } from './medical-insurances.component';

describe('MedicalInsurancesComponent', () => {
  let component: MedicalInsurancesComponent;
  let fixture: ComponentFixture<MedicalInsurancesComponent>;

  beforeEach(async(() => {
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
