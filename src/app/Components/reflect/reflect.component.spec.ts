import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReflectComponent } from './reflect.component';

describe('ReflectComponent', () => {
  let component: ReflectComponent;
  let fixture: ComponentFixture<ReflectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReflectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReflectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
