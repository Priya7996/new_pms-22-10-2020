import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinenewComponent } from './machinenew.component';

describe('MachinenewComponent', () => {
  let component: MachinenewComponent;
  let fixture: ComponentFixture<MachinenewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachinenewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
