import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleTimeStopToStartComponent } from './cycle-time-stop-to-start.component';

describe('CycleTimeStopToStartComponent', () => {
  let component: CycleTimeStopToStartComponent;
  let fixture: ComponentFixture<CycleTimeStopToStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycleTimeStopToStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleTimeStopToStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
