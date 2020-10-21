import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleTimeChartComponent } from './cycle-time-chart.component';

describe('CycleTimeChartComponent', () => {
  let component: CycleTimeChartComponent;
  let fixture: ComponentFixture<CycleTimeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycleTimeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleTimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
