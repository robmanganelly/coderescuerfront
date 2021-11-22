import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbsheetComponent } from './probsheet.component';

describe('ProbsheetComponent', () => {
  let component: ProbsheetComponent;
  let fixture: ComponentFixture<ProbsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
