import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnvironmentAllergiesComponent } from './environment-allergies.component';

describe('EnvironmentAllergiesComponent', () => {
  let component: EnvironmentAllergiesComponent;
  let fixture: ComponentFixture<EnvironmentAllergiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentAllergiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentAllergiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
