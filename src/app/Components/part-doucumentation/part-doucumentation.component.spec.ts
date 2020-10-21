import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartDoucumentationComponent } from './part-doucumentation.component';

describe('PartDoucumentationComponent', () => {
  let component: PartDoucumentationComponent;
  let fixture: ComponentFixture<PartDoucumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartDoucumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartDoucumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
