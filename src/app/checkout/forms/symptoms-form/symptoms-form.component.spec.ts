import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SymptomsFormComponent } from './symptoms-form.component';

describe('SymptomsFormComponent', () => {
  let component: SymptomsFormComponent;
  let fixture: ComponentFixture<SymptomsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SymptomsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
