import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OeeDashboardComponent } from './oee-dashboard.component';

describe('OeeDashboardComponent', () => {
  let component: OeeDashboardComponent;
  let fixture: ComponentFixture<OeeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OeeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OeeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
