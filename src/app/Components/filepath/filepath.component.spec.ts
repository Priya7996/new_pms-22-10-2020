import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilepathComponent } from './filepath.component';

describe('FilepathComponent', () => {
  let component: FilepathComponent;
  let fixture: ComponentFixture<FilepathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilepathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilepathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
