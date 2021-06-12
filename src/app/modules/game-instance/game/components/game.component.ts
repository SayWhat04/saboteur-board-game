import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GamesService} from '../../../../shared/services/games/games.service';
import {Observable} from 'rxjs';
import {Game} from '../../../../shared/models/game';
import {Player} from '../../../../shared/models/player';
import {GameLogicController} from '../../../../shared/services/game-logic-controller.service';
import {DialogUtilsService} from '../../../../shared/services/dialog-utils/dialog-utils.service';
import {MatDialogRef} from '@angular/material/dialog';
import {EndGameSummaryDialogComponent} from '../../../../shared/components/dialogs/end-game-summary-dialog/end-game-summary-dialog.component';
import {AuthService} from '../../../../core/authentication/auth.service';

@Component({
  selector: 'app-saboteur-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game$: Observable<Game>;
  player: Player;
  loggedUserId: string;

  // TODO: Move this to separate state service
  private gameId: string;
  public game: Game;
  private endGameDialogRef: MatDialogRef<EndGameSummaryDialogComponent, any>;

  constructor(private route: ActivatedRoute,
              private gamesService: GamesService,
              private gameLogicController: GameLogicController,
              private dialogUtilsService: DialogUtilsService,
              private router: Router,
              private auth: AuthService) {
  }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    this.game$ = this.gamesService.getGame$(this.gameId);

    this.game$.subscribe(game => {
      this.game = game;
      if (this.game.roundNumber > 3) {
        if (!this.endGameDialogRef) {
          this.endGameDialogRef = this.dialogUtilsService.openEndGameSummaryDialog({
            data: game.players,
            height: '250px',
            width: '300px'
          });

          this.endGameDialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/']);
          });
        }
      }
    });

    // TODO: Test
    this.auth.getUser().then(user => {
      this.loggedUserId = user.uid;
      this.player = this.game.players.find(player => player.uid === this.loggedUserId);
    });
  }

  async endTurn() {
    await this.gameLogicController.endTurn(this.game, this.gameId, this.loggedUserId);
  }
}
