import {Component, Input, OnInit} from '@angular/core';
import {PathCard} from '../../../../shared/models/cards/path-card';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Card} from '../../../../shared/models/cards/card';
import {CardType} from '../../../../shared/models/cards/card-type-property.enum';
import {DropIds} from '../../../../shared/models/drop-ids';
import {Player} from '../../../../shared/models/player';
import {AuthService} from '../../../../core/authentication/auth.service';
import {ActivatedRoute} from '@angular/router';
import {GameLogicController} from '../../../../shared/services/game-logic-controller.service';
import {DropToPlayerHandActionService} from '../services/drop-to-player-hand-action.service';

@Component({
  selector: 'app-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.scss']
})
export class PlayerHandComponent implements OnInit {
  @Input()
  set players(players: Array<Player>) {
    this.playersTemp = players;
    this.player = this.playersTemp.find(player => player.uid === this.loggedUserId);
    this.playerSummaryGold = this.player?.collectedGold
      .map(gold => gold.value)
      .reduce((prev, curr) => prev + curr, 0);
  }
  @Input() deck: Array<Card>;
  @Input() boardFieldsDropIds: Array<string>;
  @Input() currentPlayerIndex: number;

  playersTemp: Array<Player>;
  playersNames: Array<string>;
  player: Player;
  loggedUserId: string;
  gameId: string;
  playerSummaryGold: number;

  pathCard = CardType.PATH_CARD;
  playerHandListId = DropIds.PLAYER_HAND;
  discardPileListId = DropIds.DISCARD_PILE;

  constructor(private route: ActivatedRoute,
              private dropActionService: DropToPlayerHandActionService,
              private auth: AuthService,
              private gameLogicController: GameLogicController) {
  }

  ngOnInit(): void {
    this.auth.getUser().then(user => {
      this.loggedUserId = user.uid;
      this.player = this.playersTemp.find(player => player.uid === this.loggedUserId);
    });
    this.playersNames = this.playersTemp.map(player => player.name);
    this.gameId = this.route.snapshot.paramMap.get('id');
  }

  moveCardInHand(cdkDragDropEvent: CdkDragDrop<[Card], any>): void {
    this.dropActionService.drop(cdkDragDropEvent);
  }

  rotatePathCard(cardIndex: number) {
    const cardFromHand = this.player.cardsInHand[cardIndex] as PathCard;
    this.gameLogicController.rotateCard(cardFromHand);
  }

  isLoggedPlayerTurn(): boolean {
    return this.playersTemp[this.currentPlayerIndex].uid === this.loggedUserId;
  }
}
