import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Card} from '../../../../shared/models/cards/card';
import {Player} from '../../../../shared/models/player';
import {DropIds} from '../../../../shared/models/drop-ids';
import {ActivatedRoute} from '@angular/router';
import {GamesService} from '../../../../shared/services/games/games.service';
import {DropToPlayerPredicateService} from '../services/drop-to-player-predicate.service';
import {DropToPlayersActionService} from '../services/drop-to-players-action.service';
import {GameLogicController} from '../../../../shared/services/game-logic-controller.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  @Input() players: Array<Player>;
  @Input() currentPlayerIndex: number;
  @Input() loggedUserId: string;
  @Output() turnEnd: EventEmitter<void> = new EventEmitter<void>();

  playersTempContainer: Array<Player>;
  gameId: string;
  mainListId = DropIds.PLAYER_HAND;

  constructor(private dropActionService: DropToPlayersActionService,
              private dropPredicatesService: DropToPlayerPredicateService,
              private gamesService: GamesService,
              private gameLogicController: GameLogicController,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    this.playersTempContainer = this.players;
  }

  public dropToPlayerCardEnterPredicate(player: Player) {
    return this.dropPredicatesService.getPredicate(player);
  }

  public async dropToPlayerTile(cdkDragDropEvent: CdkDragDrop<[Card], any>, player: Player) {
    this.dropActionService.drop(cdkDragDropEvent, {player});

    // const playerIndex = this.playersTempContainer.indexOf(this.playersTempContainer
    //   .find(pl => pl.uid === this.loggedUserId));
    // this.playersTempContainer[playerIndex].cardsInHand = cdkDragDropEvent.previousContainer.data;
    // TODO: Test
    this.playersTempContainer = this.gameLogicController.updatePlayerHand(this.playersTempContainer,
      this.loggedUserId, cdkDragDropEvent.previousContainer.data);

    // TODO: Test
    await this.gamesService.patchNonArrayValue(this.gameId, {players: this.playersTempContainer});
    this.turnEnd.emit();
  }

  public getPlayerByUid(userId: string): Player {
    return (this.players as Array<Player>).find(player => player.uid === userId);
  }
}
