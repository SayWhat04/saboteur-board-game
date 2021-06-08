import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../core/authentication/auth.service';
import {GamesService} from '../../../shared/services/games/games.service';
import {Observable, Subscription} from 'rxjs';
import {Game} from '../../../shared/models/game';
import {GameLogicController} from '../../../shared/services/game-logic-controller.service';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss']
})
export class GameLobbyComponent implements OnInit, OnDestroy {
  game$: Observable<Game>;
  game: Game;
  gameId: string;
  loggedUserId: string;
  currentGameSubscription: Subscription;
  isGameStarted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private gamesService: GamesService,
    private gameLogicController: GameLogicController) {
  }

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('id');
    this.game$ = this.gamesService.getGame$(this.gameId);

    this.subscribeToCurrentGame();
    this.auth.getUser().then(user => {
      this.loggedUserId = user.uid;
    });
  }

  ngOnDestroy(): void {
    this.currentGameSubscription.unsubscribe();
  }

  public canGameBeStarted(): any {
    return this.game.gameHost !== this.loggedUserId || this.isGameStarted;
  }

  async startGame() {
    this.isGameStarted = true;
    await this.gameLogicController.startRound(this.gameId, this.game);
    const updatedGameState: Partial<Game> = {
      started: true
    };
    await this.gamesService.patchNonArrayValue(this.gameId, updatedGameState);
  }

  private subscribeToCurrentGame(): void {
    this.currentGameSubscription = this.game$.subscribe(game => {
      this.game = game;
      if (game.started) {
        this.router.navigate(['game', this.gameId]);
      }
    });
  }
}
