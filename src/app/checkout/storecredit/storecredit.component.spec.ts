import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorecreditComponent } from './storecredit.component';

describe('StorecreditComponent', () => {
  let component: StorecreditComponent;
  let fixture: ComponentFixture<StorecreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorecreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorecreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
