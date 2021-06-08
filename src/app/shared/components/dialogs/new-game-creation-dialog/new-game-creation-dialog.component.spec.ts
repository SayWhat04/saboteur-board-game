import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameCreationDialogComponent } from './new-game-creation-dialog.component';

describe('NewGameCreationDialogComponent', () => {
  let component: NewGameCreationDialogComponent;
  let fixture: ComponentFixture<NewGameCreationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGameCreationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGameCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
