import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/authentication/auth.service';
import {DialogUtilsService} from '../../../shared/services/dialog-utils/dialog-utils.service';
import {Router} from '@angular/router';
import {GamesService} from '../../../shared/services/games/games.service';
import {Observable} from 'rxjs';
import {Game} from '../../../shared/models/game';
import {Player} from '../../../shared/models/player';
import {Card} from '../../../shared/models/cards/card';
import {PlayerRole} from '../../../shared/models/player-role.enum';
import {GoldNuggetCard} from '../../../shared/models/cards/gold-nugget-card';
import {User} from '../../../shared/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  games$: Observable<Game[]>;
  displayedColumns: string[] = ['name', 'createdAt', 'gameHost', 'noOfPlayers', 'started'];
  dataSource: any; // TODO: Add types

  constructor(public auth: AuthService,
              private router: Router,
              private dialogUtilsService: DialogUtilsService,
              private gamesService: GamesService) {
  }

  ngOnInit() {
    this.games$ = this.gamesService.games$;
  }

  public createGame(): any {
    this.dialogUtilsService.openNewGameCreationDialog({panelClass: 'new-game-instance-dialog-container'});
  }

  public async openGameLobby(gameId: string) {
    const authenticatedUser = await this.auth.getUser();
    let tempGame: Game;
    this.gamesService.getGame$(gameId).subscribe(game => {
      tempGame = game;
    });

    if (tempGame && this.canLobbyBeEntered(tempGame, authenticatedUser)) {
      const newPlayer = new Player(authenticatedUser.displayName,
        new Array<Card>(), new Array<Card>(),
        false, true, true, true, PlayerRole.NOT_SET,
        new Array<GoldNuggetCard>(),
        authenticatedUser.uid);

      await this.gamesService.modifyArrayValue(gameId,
        'players', Object.assign({}, newPlayer));
      return this.router.navigate(['lobby', gameId]);
    }
  }

  private canLobbyBeEntered(game: Game, authUser: User): boolean {
    return game.players.length < game.maxNumberOfPlayers
      && !game.players.some(player => player.uid === authUser.uid);
  }
}
