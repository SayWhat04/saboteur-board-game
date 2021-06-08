import {Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DoubleRepairCardDialogData} from '../../../models/dialog-data/double-repair-card-dialog-data';
import {ActionCardType} from '../../../models/cards/action-card-type-property.enum';

@Component({
  selector: 'app-double-repair-card-dialog',
  templateUrl: './double-repair-card-dialog.component.html',
  styleUrls: ['./double-repair-card-dialog.component.scss']
})
export class DoubleRepairCardDialogComponent {

  ActionCardType = ActionCardType;

  constructor(
    public dialogRef: MatDialogRef<DoubleRepairCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DoubleRepairCardDialogData) {
  }
}
