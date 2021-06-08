import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleRepairCardDialogComponent } from './double-repair-card-dialog.component';

describe('DoubleRepairCardDialogComponent', () => {
  let component: DoubleRepairCardDialogComponent;
  let fixture: ComponentFixture<DoubleRepairCardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleRepairCardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleRepairCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
