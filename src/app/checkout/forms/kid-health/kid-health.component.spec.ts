import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KidHealthComponent } from './kid-health.component';

describe('KidHealthComponent', () => {
  let component: KidHealthComponent;
  let fixture: ComponentFixture<KidHealthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KidHealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KidHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
