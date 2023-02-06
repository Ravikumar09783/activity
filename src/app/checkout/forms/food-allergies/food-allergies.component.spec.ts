import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FoodAllergiesComponent } from './food-allergies.component';

describe('FoodAllergiesComponent', () => {
  let component: FoodAllergiesComponent;
  let fixture: ComponentFixture<FoodAllergiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodAllergiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodAllergiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
