import { ComponentFixture, TestBed } from '@angular/core/testing';

import { section4Component } from './section4.component';

describe('section4Component', () => {
  let component: section4Component;
  let fixture: ComponentFixture<section4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [section4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(section4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
