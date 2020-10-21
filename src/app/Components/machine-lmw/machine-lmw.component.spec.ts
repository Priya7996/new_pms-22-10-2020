import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineLmwComponent } from './machine-lmw.component';

describe('MachineLmwComponent', () => {
  let component: MachineLmwComponent;
  let fixture: ComponentFixture<MachineLmwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineLmwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineLmwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
