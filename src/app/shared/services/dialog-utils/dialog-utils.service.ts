import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {MapCardDialogComponent} from '../../components/dialogs/map-card-dialog/map-card-dialog.component';
import {DoubleRepairCardDialogComponent} from '../../components/dialogs/double-repair-card-dialog/double-repair-card-dialog.component';
import {NewGameCreationDialogComponent} from '../../components/dialogs/new-game-creation-dialog/new-game-creation-dialog.component';
import {EndGameSummaryDialogComponent} from '../../components/dialogs/end-game-summary-dialog/end-game-summary-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogUtilsService {

  constructor(public dialog: MatDialog) { }

  public openMapCardDialog(config: MatDialogConfig): MatDialogRef<MapCardDialogComponent, any> {
    return this.dialog.open(MapCardDialogComponent, config);
  }

  public openDoubleRepairCardDialog(config: MatDialogConfig): MatDialogRef<DoubleRepairCardDialogComponent, any> {
    return this.dialog.open(DoubleRepairCardDialogComponent, config);
  }

  public openNewGameCreationDialog(config: MatDialogConfig): MatDialogRef<NewGameCreationDialogComponent, any>  {
    return this.dialog.open(NewGameCreationDialogComponent, config);
  }

  public openEndGameSummaryDialog(config: MatDialogConfig): MatDialogRef<EndGameSummaryDialogComponent, any>  {
    return this.dialog.open(EndGameSummaryDialogComponent, config);
  }
}
