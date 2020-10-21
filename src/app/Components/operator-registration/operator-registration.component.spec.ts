import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorRegistrationComponent } from './operator-registration.component';

describe('OperatorRegistrationComponent', () => {
  let component: OperatorRegistrationComponent;
  let fixture: ComponentFixture<OperatorRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
