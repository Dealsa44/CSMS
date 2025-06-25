import { ComponentFixture, TestBed } from '@angular/core/testing';

import { section3Component } from './section3.component';

describe('section3Component', () => {
  let component: section3Component;
  let fixture: ComponentFixture<section3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [section3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(section3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
