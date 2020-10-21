import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorAllocationComponent } from './operator-allocation.component';

describe('OperatorAllocationComponent', () => {
  let component: OperatorAllocationComponent;
  let fixture: ComponentFixture<OperatorAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
