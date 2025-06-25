import { ComponentFixture, TestBed } from '@angular/core/testing';

import { section1Component } from './section1.component';

describe('section1Component', () => {
  let component: section1Component;
  let fixture: ComponentFixture<section1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [section1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(section1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
