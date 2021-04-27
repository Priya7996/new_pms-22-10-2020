import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationManComponent } from './operation-man.component';

describe('OperationManComponent', () => {
  let component: OperationManComponent;
  let fixture: ComponentFixture<OperationManComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationManComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
