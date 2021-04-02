import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonMacroComponent } from './reason-macro.component';

describe('ReasonMacroComponent', () => {
  let component: ReasonMacroComponent;
  let fixture: ComponentFixture<ReasonMacroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonMacroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonMacroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
