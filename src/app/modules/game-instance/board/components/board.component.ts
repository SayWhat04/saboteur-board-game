import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropIds} from '../../../../shared/models/drop-ids';
import {Board} from '../../../../shared/models/board/board';
import {DbBoard} from '../../../../shared/models/board/db-board';
import {DbBoardBoardConverter} from '../../../../shared/services/board/db-board-board-to-converter';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Card} from '../../../../shared/models/cards/card';
import {ActivatedRoute} from '@angular/router';
import {ActionCardType} from '../../../../shared/models/cards/action-card-type-property.enum';
import {Player} from '../../../../shared/models/player';
import {Game} from '../../../../shared/models/game';
import {BoardToDbBoardConverter} from '../../../../shared/services/board/board-to-db-board-converter';
import {GamesService} from '../../../../shared/services/games/games.service';
import {AuthService} from '../../../../core/authentication/auth.service';
import {DropToBoardActionService} from '../services/drop-to-board-action.service';
import {DropToBoardPredicateService} from '../services/drop-to-board-predicate.service';
import {GameLogicController} from '../../../../shared/services/game-logic-controller.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input()
  set players(players: Array<Player>) {
    this.playersTempContainer = players;
    this.player = this.playersTempContainer.find(player => player.uid === this.loggedUserId);
  }

  @Input()
  set board(board: DbBoard) {
    this.boardTemp = this.dbBoardBoardConverter.convert(board);
  }

  @Input()
  set discardPile(discardPile: Array<Card>) {
    this.discardPileTemp = discardPile;
  }

  @Input() loggedUserId: string;
  @Output() turnEnd: EventEmitter<void> = new EventEmitter<void>();

  gameId: string;
  mainListId = DropIds.PLAYER_HAND;
  boardTemp: Board;
  discardPileTemp: Array<Card>;
  playersTempContainer: Array<Player>;
  player: Player;

  constructor(private dropActionService: DropToBoardActionService,
              private dropPredicatesService: DropToBoardPredicateService,
              private route: ActivatedRoute,
              private dbBoardBoardConverter: DbBoardBoardConverter,
              private boardToDbBoardConverter: BoardToDbBoardConverter,
              private gamesService: GamesService,
              private auth: AuthService,
              private gameLogicController: GameLogicController) {
  }

  ngOnInit(): void {
    this.auth.getUser().then(user => {
      this.loggedUserId = user.uid;
      this.player = this.playersTempContainer.find(player => player.uid === this.loggedUserId);
    });
    this.gameId = this.route.snapshot.paramMap.get('id');
  }

  public dropToBoardEnterPredicate(fieldRowIndex: number, fieldColumnIndex: number, board: Board, player: Player) {
    return this.dropPredicatesService.getPredicate({fieldRowIndex, fieldColumnIndex, board, player});
  }

  // TODO: Try to refactor
  public async dropToBoard(cdkDragDropEvent: CdkDragDrop<[Card], any>,
                           fieldRowIndex: number, fieldColumnIndex: number,
                           board: Board) {
    const dragContainer = cdkDragDropEvent.previousContainer;
    const draggedCard = dragContainer.data[cdkDragDropEvent.previousIndex];

    if (cdkDragDropEvent.isPointerOverContainer) { // TODO: Test!!
      if (draggedCard.type === ActionCardType.MAP || draggedCard.type === ActionCardType.ROCK_FALL) {
        this.discardPileTemp.unshift(draggedCard);
        await this.gamesService.patchNonArrayValue(this.gameId, {discardPileState: this.discardPileTemp});
      }
      this.dropActionService.drop(cdkDragDropEvent, {fieldRowIndex, fieldColumnIndex, board});

      // TODO: Move to separate method
      // const playerIndex = this.playersTempContainer.indexOf(this.playersTempContainer
      //   .find(pl => pl.uid === this.loggedUserId));
      // this.playersTempContainer[playerIndex].cardsInHand = cdkDragDropEvent.previousContainer.data;

      // TODO: Test
      this.playersTempContainer = this.gameLogicController.updatePlayerHand(this.playersTempContainer,
        this.loggedUserId, cdkDragDropEvent.previousContainer.data);

      const updatedGame: Partial<Game> = {
        boardState: this.boardToDbBoardConverter.convert(board),
        players: this.playersTempContainer
      };

      await this.gamesService.patchNonArrayValue(this.gameId, updatedGame);
      this.turnEnd.emit();
    }
  }
}
