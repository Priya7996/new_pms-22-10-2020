import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleTimeStartToStartComponent } from './cycle-time-start-to-start.component';

describe('CycleTimeStartToStartComponent', () => {
  let component: CycleTimeStartToStartComponent;
  let fixture: ComponentFixture<CycleTimeStartToStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycleTimeStartToStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleTimeStartToStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
