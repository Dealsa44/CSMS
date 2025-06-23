import { ComponentFixture, TestBed } from '@angular/core/testing';

import { section5Component } from './section5.component';

describe('section5Component', () => {
  let component: section5Component;
  let fixture: ComponentFixture<section5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [section5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(section5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
