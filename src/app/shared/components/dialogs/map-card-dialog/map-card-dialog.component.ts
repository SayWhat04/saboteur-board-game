import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MapCardDialogData} from '../../../models/dialog-data/map-card-dialog-data';

@Component({
  selector: 'app-map-card-dialog',
  templateUrl: './map-card-dialog.component.html',
  styleUrls: ['./map-card-dialog.component.scss']
})
export class MapCardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MapCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MapCardDialogData) {
  }
}
