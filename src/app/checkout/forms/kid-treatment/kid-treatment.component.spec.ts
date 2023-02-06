import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KidTreatmentComponent } from './kid-treatment.component';

describe('KidTreatmentComponent', () => {
  let component: KidTreatmentComponent;
  let fixture: ComponentFixture<KidTreatmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KidTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KidTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
