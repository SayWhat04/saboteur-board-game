import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCardDialogComponent } from './map-card-dialog.component';

describe('MapCardDialogComponent', () => {
  let component: MapCardDialogComponent;
  let fixture: ComponentFixture<MapCardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapCardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
