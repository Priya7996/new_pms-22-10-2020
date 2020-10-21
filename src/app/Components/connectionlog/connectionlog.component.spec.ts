import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionlogComponent } from './connectionlog.component';

describe('ConnectionlogComponent', () => {
  let component: ConnectionlogComponent;
  let fixture: ComponentFixture<ConnectionlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
