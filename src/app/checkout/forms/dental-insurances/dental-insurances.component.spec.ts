import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DentalInsurancesComponent } from './dental-insurances.component';

describe('DentalInsurancesComponent', () => {
  let component: DentalInsurancesComponent;
  let fixture: ComponentFixture<DentalInsurancesComponent>;

  beforeEach(async(() => {
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
