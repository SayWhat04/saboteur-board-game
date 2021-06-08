import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndGameSummaryDialogComponent } from './end-game-summary-dialog.component';

describe('EndGameSummaryDialogComponent', () => {
  let component: EndGameSummaryDialogComponent;
  let fixture: ComponentFixture<EndGameSummaryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndGameSummaryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndGameSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
