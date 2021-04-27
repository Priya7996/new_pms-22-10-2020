import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationAssignComponent } from './operation-assign.component';

describe('OperationAssignComponent', () => {
  let component: OperationAssignComponent;
  let fixture: ComponentFixture<OperationAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
