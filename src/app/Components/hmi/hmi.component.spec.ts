import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmiComponent } from './hmi.component';

describe('HmiComponent', () => {
  let component: HmiComponent;
  let fixture: ComponentFixture<HmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
