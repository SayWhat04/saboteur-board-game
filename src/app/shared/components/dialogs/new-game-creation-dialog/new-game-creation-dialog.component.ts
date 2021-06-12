import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {POSSIBLE_NO_OF_PLAYERS} from '../../../../configs/game-specific-const';
import {GameLogicController} from '../../../services/game-logic-controller.service';

@Component({
  selector: 'app-new-game-creation-dialog',
  templateUrl: './new-game-creation-dialog.component.html',
  styleUrls: ['./new-game-creation-dialog.component.scss']
})
export class NewGameCreationDialogComponent {
  possibleNoOfPlayers = POSSIBLE_NO_OF_PLAYERS;
  newGameFormGroup: FormGroup;
  nameFormControl = new FormControl('', Validators.required);
  playersFormControl = new FormControl('', Validators.required);

  constructor(
    public dialogRef: MatDialogRef<NewGameCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private fb: FormBuilder,
    private gameLogicController: GameLogicController) {

    this.newGameFormGroup = fb.group({
      name: this.nameFormControl,
      players: this.playersFormControl
    });
  }

  public async createGame(gameName: string, players: number) {
    const gameId = await this.gameLogicController.createGame(gameName, players);
    this.dialogRef.close();
    await this.router.navigate(['lobby', gameId]);
  }
}
