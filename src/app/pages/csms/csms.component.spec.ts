import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsmsComponent } from './csms.component';

describe('CsmsComponent', () => {
  let component: CsmsComponent;
  let fixture: ComponentFixture<CsmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
