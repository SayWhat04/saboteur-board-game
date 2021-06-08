import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Card} from '../../../../shared/models/cards/card';
import {ActivatedRoute} from '@angular/router';
import {GamesService} from '../../../../shared/services/games/games.service';
import {DropIds} from '../../../../shared/models/drop-ids';
import {Player} from '../../../../shared/models/player';
import {Game} from '../../../../shared/models/game';
import {PlayerRole} from '../../../../shared/models/player-role.enum';
import {DropToDiscardPileActionService} from '../services/drop-to-discard-pile-action.service';
import {GameLogicController} from '../../../../shared/services/game-logic-controller.service';

@Component({
  selector: 'app-game-state',
  templateUrl: './game-state.component.html',
  styleUrls: ['./game-state.component.scss']
})
export class GameStateComponent implements OnInit {
  @Input()
  set discardPile(discardPile: Array<Card>) {
    this.discardPileTempContainer = discardPile;
  }
  @Input()
  set players(players: Array<Player>) {
    this.playersTempContainer = players;
    this.player = this.playersTempContainer.find(player => player.uid === this.loggedUserId);
  }
  @Input() loggedUserId: string;
  @Input() deck: Array<Card>;
  @Output() turnEnd: EventEmitter<void> = new EventEmitter<void>();

  player: Player;
  playersTempContainer: Array<Player>;
  discardPileTempContainer: Array<Card>;
  gameId: string;
  discardPileId = DropIds.DISCARD_PILE;
  mainListId = DropIds.PLAYER_HAND;
  saboteurRole = PlayerRole.SABOTEUR;
  minerRole = PlayerRole.MINER;

  // TODO Move elsewhere:
  saboteurImagePath = '/assets/images/saboteur_role.png';
  minerImagePath = '/assets/images/miner_role.png';

  constructor(private dropActionService: DropToDiscardPileActionService,
              private gamesService: GamesService,
              private route: ActivatedRoute,
              private gameLogicController: GameLogicController) {
  }

  ngOnInit(): void {
    this.player = this.playersTempContainer.find(player => player.uid === this.loggedUserId);
    this.gameId = this.route.snapshot.paramMap.get('id');
  }

  public async dropToDiscardPile(cdkDragDropEvent: CdkDragDrop<[Card], any>) {
    this.dropActionService.drop(cdkDragDropEvent);

    // TODO: Move to separate method
    // const playerIndex = this.playersTempContainer.indexOf(this.playersTempContainer
    //   .find(pl => pl.uid === this.loggedUserId));
    // this.playersTempContainer[playerIndex].cardsInHand = cdkDragDropEvent.previousContainer.data;

    // TODO: Test
    this.playersTempContainer = this.gameLogicController.updatePlayerHand(this.playersTempContainer,
      this.loggedUserId, cdkDragDropEvent.previousContainer.data);

    const updatedGame: Partial<Game> = {
      discardPileState: this.discardPileTempContainer,
      players: this.playersTempContainer
    };
    await this.gamesService.patchNonArrayValue(this.gameId, updatedGame);
    this.turnEnd.emit();
  }
}
