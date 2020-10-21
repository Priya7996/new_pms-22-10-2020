import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineRegistrationComponent } from './machine-registration.component';

describe('MachineRegistrationComponent', () => {
  let component: MachineRegistrationComponent;
  let fixture: ComponentFixture<MachineRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
