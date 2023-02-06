import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DentalInsurancesComponent } from './dental-insurances.component';

describe('DentalInsurancesComponent', () => {
  let component: DentalInsurancesComponent;
  let fixture: ComponentFixture<DentalInsurancesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DentalInsurancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DentalInsurancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
