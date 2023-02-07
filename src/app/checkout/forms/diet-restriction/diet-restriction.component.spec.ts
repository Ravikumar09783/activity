import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietRestrictionComponent } from './diet-restriction.component';

describe('DietRestrictionComponent', () => {
  let component: DietRestrictionComponent;
  let fixture: ComponentFixture<DietRestrictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietRestrictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietRestrictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
