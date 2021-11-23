import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheatsheetComponent } from './cheatsheet.component';

describe('CheatsheetComponent', () => {
  let component: CheatsheetComponent;
  let fixture: ComponentFixture<CheatsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheatsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheatsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
