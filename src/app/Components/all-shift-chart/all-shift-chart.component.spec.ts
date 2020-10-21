import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllShiftChartComponent } from './all-shift-chart.component';

describe('AllShiftChartComponent', () => {
  let component: AllShiftChartComponent;
  let fixture: ComponentFixture<AllShiftChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllShiftChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllShiftChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
